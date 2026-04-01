ALTER TABLE `users`
  ADD COLUMN `lemon_customer_id` VARCHAR(255) NULL,
  ADD COLUMN `lemon_subscription_id` VARCHAR(255) NULL;

CREATE UNIQUE INDEX `lemon_customer_id_UNIQUE` ON `users`(`lemon_customer_id`);
CREATE UNIQUE INDEX `lemon_subscription_id_UNIQUE` ON `users`(`lemon_subscription_id`);
