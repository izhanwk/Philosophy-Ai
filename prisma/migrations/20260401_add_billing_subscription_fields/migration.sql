ALTER TABLE `users`
  ADD COLUMN `stripe_customer_id` VARCHAR(255) NULL,
  ADD COLUMN `stripe_subscription_id` VARCHAR(255) NULL,
  ADD COLUMN `subscription_status` VARCHAR(40) NULL,
  ADD COLUMN `subscription_price_id` VARCHAR(255) NULL,
  ADD COLUMN `subscription_current_period_end` DATETIME NULL;

CREATE UNIQUE INDEX `stripe_customer_id_UNIQUE` ON `users`(`stripe_customer_id`);
CREATE UNIQUE INDEX `stripe_subscription_id_UNIQUE` ON `users`(`stripe_subscription_id`);
