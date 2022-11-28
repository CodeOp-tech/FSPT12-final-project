CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile_pic` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `zipcode` INT NOT NULL,
    `address` LONGTEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `recipes_saved`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `recipe_ID` INT NOT NULL,
    `user_id` INT NOT NULL,
    `recipe_image` LONGTEXT NOT NULL,
    `recipe_title` LONGTEXT NOT NULL,
    `recipe_summary` LONGTEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `ingredients`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ingredient` VARCHAR(255) NOT NULL,
    `unit_price` DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_cost` DECIMAL(8, 2) NOT NULL,
    `delivery_cost` DECIMAL(8, 2) NOT NULL,
    `user_id` INT NOT NULL,
    `payment_date` DATETIME NOT NULL,
    `delivery_status` TINYINT(1) NOT NULL,
    `ordered_ingredients` VARCHAR(999) NOT NULL,
    PRIMARY KEY(id)
);

-- ALTER TABLE
--     `recipes_saved` ADD CONSTRAINT `recipes_saved_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
-- ALTER TABLE
--     `orders` ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);