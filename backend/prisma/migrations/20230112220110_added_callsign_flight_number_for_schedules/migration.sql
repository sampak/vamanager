/*
  Warnings:

  - Added the required column `callsign` to the `Schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightNumber` to the `Schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_of_flight` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Aircrafts_airlineId_fkey` ON `aircrafts`;

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
ALTER TABLE `schedules` ADD COLUMN `callsign` VARCHAR(191) NOT NULL,
    ADD COLUMN `flightNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `type_of_flight` ENUM('CARGO', 'PASSANGERS') NOT NULL;

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
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `Airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_typeOfAircraftId_fkey` FOREIGN KEY (`typeOfAircraftId`) REFERENCES `TypeOfAircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
