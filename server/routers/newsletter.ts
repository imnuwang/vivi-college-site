import { z } from "zod";
import { getNewsletterSubscription, subscribeNewsletter, unsubscribeNewsletter } from "../db";
import { publicProcedure, router } from "../_core/trpc";

const email = z.string().trim().email("請輸入可收信的 Email").max(320).transform(value => value.toLowerCase());

export const newsletterSegments = [
  "site_newsletter",
  "signal-notes",
  "brand-clarity",
  "style-intention",
] as const;

export const newsletterSubscriptionInput = z.object({
  email,
  segment: z.enum(newsletterSegments).default("site_newsletter"),
});

export const newsletterUnsubscribeInput = z.object({ email });
export const newsletterStatusInput = z.object({ email });

export const newsletterRouter = router({
  status: publicProcedure.input(newsletterStatusInput).query(async ({ input }) => {
    const subscription = await getNewsletterSubscription(input.email);
    return subscription ?? { email: input.email, status: "not_found" as const, segments: [] };
  }),
  subscribe: publicProcedure.input(newsletterSubscriptionInput).mutation(async ({ input }) => {
    const subscriber = await subscribeNewsletter(input.email, input.segment);
    return {
      email: subscriber.email,
      status: subscriber.status,
      message: "你已訂閱月光來信，請留意後續寄送的工具與內容。",
    };
  }),
  unsubscribe: publicProcedure.input(newsletterUnsubscribeInput).mutation(async ({ input }) => {
    const result = await unsubscribeNewsletter(input.email);
    return {
      email: result.email,
      status: "unsubscribed" as const,
      message: "你已取消訂閱月光來信。",
    };
  }),
});

export type NewsletterRouter = typeof newsletterRouter;
