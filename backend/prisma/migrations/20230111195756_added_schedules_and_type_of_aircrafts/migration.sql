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

-- CreateTable
CREATE TABLE `TypeOfAircraft` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedules` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('EVERYDAY', 'ON_CERTAIN_DAYS', 'ONCE') NOT NULL DEFAULT 'EVERYDAY',
    `airlineId` VARCHAR(191) NOT NULL,
    `originId` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `typeOfAircraftId` VARCHAR(191) NOT NULL,
    `day` DATETIME(3) NOT NULL,
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
