CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`pages_read` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`track_id` text NOT NULL,
	FOREIGN KEY (`track_id`) REFERENCES `track`(`id`) ON UPDATE no action ON DELETE cascade
);
