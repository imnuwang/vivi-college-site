import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  newsletterSubscriberSegments,
  newsletterSubscribers,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function subscribeNewsletter(email: string, segment: string) {
  const db = await getDb();
  if (!db) throw new Error("Newsletter database is not available");

  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date();

  await db
    .insert(newsletterSubscribers)
    .values({
      email: normalizedEmail,
      status: "active",
      source: segment,
      subscribedAt: now,
      unsubscribedAt: null,
    })
    .onDuplicateKeyUpdate({
      set: {
        status: "active",
        source: segment,
        subscribedAt: now,
        unsubscribedAt: null,
      },
    });

  const [subscriber] = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, normalizedEmail))
    .limit(1);

  if (!subscriber) throw new Error("Newsletter subscriber could not be created");

  await db
    .insert(newsletterSubscriberSegments)
    .values({ subscriberId: subscriber.id, segment })
    .onDuplicateKeyUpdate({ set: { segment } });

  return subscriber;
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Newsletter database is not available");

  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date();
  await db
    .update(newsletterSubscribers)
    .set({ status: "unsubscribed", unsubscribedAt: now })
    .where(eq(newsletterSubscribers.email, normalizedEmail));

  return { email: normalizedEmail, unsubscribedAt: now };
}

export async function getNewsletterSubscription(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Newsletter database is not available");

  const normalizedEmail = email.trim().toLowerCase();
  const [subscriber] = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, normalizedEmail))
    .limit(1);

  if (!subscriber) return null;

  const segments = await db
    .select({ segment: newsletterSubscriberSegments.segment })
    .from(newsletterSubscriberSegments)
    .where(eq(newsletterSubscriberSegments.subscriberId, subscriber.id));

  return {
    email: subscriber.email,
    status: subscriber.status,
    segments: segments.map(item => item.segment),
  };
}
