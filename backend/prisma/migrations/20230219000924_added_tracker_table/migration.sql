/*
  Warnings:

  - A unique constraint covering the columns `[trackerId]` on the table `pireps` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pireps` ADD COLUMN `trackerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pireps_route` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `tracker` (
    `id` VARCHAR(191) NOT NULL,
    `trackerId` VARCHAR(191) NOT NULL,
    `pirepId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('EVENT', 'TRACKER') NOT NULL,
    `log` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `ias` INTEGER NOT NULL,
    `heading` INTEGER NOT NULL,
    `vs` INTEGER NOT NULL,
    `gs` INTEGER NOT NULL,
    `altitude` INTEGER NOT NULL,
    `distance` INTEGER NOT NULL,
    `sim_time` VARCHAR(191) NOT NULL,
    `engines` VARCHAR(191) NOT NULL,
    `gearState` ENUM('UP', 'DOWN', 'UNDEFINED') NOT NULL,
    `flight_phase` ENUM('INITIALIZED', 'SCHEDULED', 'BOARDING', 'PUSHBACK', 'TAXI', 'TAKE_OFF', 'CLIMB', 'ENROUTE', 'DESCENT', 'FINAL_APPROACH', 'LANDED', 'ARRIVED', 'DIVERTED') NOT NULL,
    `flaps` INTEGER NOT NULL,
    `fuel` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `landing_rate` INTEGER NOT NULL,
    `stall` BOOLEAN NOT NULL,
    `overspeed` BOOLEAN NOT NULL,
    `sim_paused` BOOLEAN NOT NULL,
    `transponder` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tracker_trackerId_key`(`trackerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `pireps_trackerId_key` ON `pireps`(`trackerId`);

-- AddForeignKey
ALTER TABLE `tracker` ADD CONSTRAINT `tracker_pirepId_fkey` FOREIGN KEY (`pirepId`) REFERENCES `pireps`(`trackerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracker` ADD CONSTRAINT `tracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
