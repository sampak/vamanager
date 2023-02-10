-- DropIndex
DROP INDEX `Airlines_baseId_fkey` ON `airlines`;

-- DropIndex
DROP INDEX `Airlines_ownerId_fkey` ON `airlines`;

-- DropIndex
DROP INDEX `Memberships_airlineId_fkey` ON `memberships`;

-- DropIndex
DROP INDEX `Memberships_userId_fkey` ON `memberships`;

-- AlterTable
ALTER TABLE `memberships` ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 500;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
