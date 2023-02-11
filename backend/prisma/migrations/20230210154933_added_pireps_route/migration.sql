-- CreateTable
CREATE TABLE `pireps_route` (
    `id` VARCHAR(191) NOT NULL,
    `ident` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `pos_lat` VARCHAR(191) NOT NULL,
    `pos_lng` VARCHAR(191) NOT NULL,
    `airway` VARCHAR(191) NOT NULL,
    `is_sid_star` BOOLEAN NOT NULL,
    `index` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
