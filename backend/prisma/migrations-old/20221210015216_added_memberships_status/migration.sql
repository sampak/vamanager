/*
  Warnings:

  - Added the required column `ownerId` to the `Airlines` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Airlines_baseId_fkey` ON `airlines`;

-- AlterTable
ALTER TABLE `airlines` ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Memberships` (
    `id` VARCHAR(191) NOT NULL,
    `airlineId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'NON_ACTIVE', 'DISABLED', 'WAITING_APPROVAL', 'WAITING_TO_JOIN') NOT NULL DEFAULT 'WAITING_APPROVAL',
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
