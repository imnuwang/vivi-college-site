CREATE TABLE `newsletterSubscriberSegments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriberId` int NOT NULL,
	`segment` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletterSubscriberSegments_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscriber_segment_unique` UNIQUE(`subscriberId`,`segment`)
);
