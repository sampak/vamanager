/*
  Warnings:

  - You are about to drop the column `runwayLength` on the `airports` table. All the data in the column will be lost.
  - Added the required column `passangers` to the `Airports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Airports` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Aircrafts_airlineId_fkey` ON `aircrafts`;

-- DropIndex
DROP INDEX `Aircrafts_typeId_fkey` ON `aircrafts`;

-- DropIndex
DROP INDEX `AircraftsDealer_typeId_fkey` ON `aircraftsdealer`;

-- DropIndex
DROP INDEX `Airlines_baseId_fkey` ON `airlines`;

-- DropIndex
DROP INDEX `Airlines_ownerId_fkey` ON `airlines`;

-- DropIndex
DROP INDEX `Memberships_airlineId_fkey` ON `memberships`;

-- DropIndex
DROP INDEX `Memberships_userId_fkey` ON `memberships`;

-- DropIndex
DROP INDEX `Schedules_airlineId_fkey` ON `schedules`;

-- DropIndex
DROP INDEX `Schedules_destinationId_fkey` ON `schedules`;

-- DropIndex
DROP INDEX `Schedules_originId_fkey` ON `schedules`;

-- DropIndex
DROP INDEX `Schedules_typeOfAircraftId_fkey` ON `schedules`;

-- AlterTable
ALTER TABLE `airports` DROP COLUMN `runwayLength`,
    ADD COLUMN `passangers` INTEGER NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memberships` ADD CONSTRAINT `Memberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aircrafts` ADD CONSTRAINT `Aircrafts_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aircrafts` ADD CONSTRAINT `Aircrafts_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TypeOfAircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AircraftsDealer` ADD CONSTRAINT `AircraftsDealer_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TypeOfAircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_typeOfAircraftId_fkey` FOREIGN KEY (`typeOfAircraftId`) REFERENCES `TypeOfAircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
