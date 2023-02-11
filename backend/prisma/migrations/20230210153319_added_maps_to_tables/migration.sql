-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `allowShowLastName` BOOLEAN NULL DEFAULT false,
    `status` ENUM('ACTIVE', 'NON_ACTIVE', 'SUSPENDED', 'PENDING_CODE', 'WAITING_TO_JOIN') NOT NULL DEFAULT 'ACTIVE',
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airports` (
    `id` VARCHAR(191) NOT NULL,
    `icao` VARCHAR(191) NOT NULL,
    `iata` VARCHAR(191) NOT NULL,
    `elevation_ft` DOUBLE NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `passangers` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airlines` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `icao` VARCHAR(191) NOT NULL,
    `baseId` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `costIndex` INTEGER NOT NULL DEFAULT 15,
    `balance` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 500,
    `joining_type` ENUM('PUBLIC_ACCESS', 'INVITATION_ONLY', 'APPROVAL_NEEDED') NOT NULL DEFAULT 'APPROVAL_NEEDED',
    `options` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `airlines_name_key`(`name`),
    UNIQUE INDEX `airlines_icao_key`(`icao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memberships` (
    `id` VARCHAR(191) NOT NULL,
    `airlineId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'NON_ACTIVE', 'DISABLED', 'WAITING_APPROVAL', 'WAITING_TO_JOIN') NOT NULL DEFAULT 'WAITING_APPROVAL',
    `role` ENUM('ADMIN', 'DISPATCHER', 'PILOT') NOT NULL DEFAULT 'PILOT',
    `rating` INTEGER NOT NULL DEFAULT 500,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aircrafts` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `airlineId` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `registration` VARCHAR(191) NOT NULL,
    `minutes` INTEGER NOT NULL DEFAULT 0,
    `miles` INTEGER NOT NULL DEFAULT 0,
    `condition` INTEGER NOT NULL DEFAULT 100,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `aircrafts_registration_key`(`registration`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aircrafts_dealer` (
    `id` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL DEFAULT '',
    `image` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_of_aircraft` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `id` VARCHAR(191) NOT NULL,
    `callsign` VARCHAR(191) NOT NULL,
    `flightNumber` VARCHAR(191) NOT NULL,
    `estimatedFuel` INTEGER NOT NULL DEFAULT 0,
    `airDistance` INTEGER NOT NULL DEFAULT 0,
    `recommendedRoute` VARCHAR(191) NULL,
    `type` ENUM('EVERYDAY', 'ON_CERTAIN_DAYS', 'ONCE') NOT NULL DEFAULT 'EVERYDAY',
    `airlineId` VARCHAR(191) NOT NULL,
    `estimatedPassangers` INTEGER NOT NULL DEFAULT 100,
    `originId` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `typeOfAircraftId` VARCHAR(191) NOT NULL,
    `day` DATETIME(3) NOT NULL,
    `weekDay` INTEGER NOT NULL DEFAULT 0,
    `flightTime` INTEGER NOT NULL DEFAULT 0,
    `costIndex` VARCHAR(191) NOT NULL DEFAULT 'AUTO',
    `status` ENUM('CREATING', 'CREATED') NOT NULL,
    `type_of_flight` ENUM('CARGO', 'PASSANGERS') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pireps` (
    `id` VARCHAR(191) NOT NULL,
    `callsign` VARCHAR(191) NOT NULL,
    `flightNumber` VARCHAR(191) NOT NULL,
    `estimatedFuel` INTEGER NOT NULL DEFAULT 0,
    `blockFuel` INTEGER NOT NULL DEFAULT 0,
    `estminatedAirDistance` INTEGER NOT NULL DEFAULT 0,
    `airDistance` INTEGER NOT NULL DEFAULT 0,
    `passangers` INTEGER NOT NULL DEFAULT 0,
    `estimatedFlightTime` INTEGER NOT NULL DEFAULT 0,
    `flightTime` INTEGER NOT NULL DEFAULT 0,
    `takeoffTime` DATETIME(3) NULL,
    `landingTime` DATETIME(3) NULL,
    `dx_rmk` TEXT NOT NULL DEFAULT '',
    `flightplanText` TEXT NOT NULL DEFAULT '',
    `routeText` TEXT NOT NULL DEFAULT '',
    `remarks` TEXT NOT NULL DEFAULT '',
    `est_zfw` INTEGER NOT NULL DEFAULT 0,
    `est_tow` INTEGER NOT NULL DEFAULT 0,
    `orig_metar` TEXT NOT NULL DEFAULT '',
    `orig_taf` TEXT NOT NULL DEFAULT '',
    `dest_metar` TEXT NOT NULL DEFAULT '',
    `dest_taf` TEXT NOT NULL DEFAULT '',
    `altn_metar` TEXT NOT NULL DEFAULT '',
    `altn_taf` TEXT NOT NULL DEFAULT '',
    `pilot_notes` VARCHAR(191) NOT NULL DEFAULT '',
    `plan_html` LONGTEXT NOT NULL DEFAULT '',
    `originId` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `pilotId` VARCHAR(191) NOT NULL,
    `airlineId` VARCHAR(191) NOT NULL,
    `aircraftId` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('CREATING', 'CREATED', 'REJECTED', 'ACCEPTED', 'AWAITING_VALIDATION') NOT NULL,
    `zfw` INTEGER NOT NULL DEFAULT 0,
    `tow` INTEGER NOT NULL DEFAULT 0,
    `units` VARCHAR(191) NOT NULL DEFAULT 'kgs',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `airlines` ADD CONSTRAINT `airlines_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `airlines` ADD CONSTRAINT `airlines_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aircrafts` ADD CONSTRAINT `aircrafts_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aircrafts` ADD CONSTRAINT `aircrafts_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `type_of_aircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aircrafts_dealer` ADD CONSTRAINT `aircrafts_dealer_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `type_of_aircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_typeOfAircraftId_fkey` FOREIGN KEY (`typeOfAircraftId`) REFERENCES `type_of_aircraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pireps` ADD CONSTRAINT `pireps_pilotId_fkey` FOREIGN KEY (`pilotId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pireps` ADD CONSTRAINT `pireps_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pireps` ADD CONSTRAINT `pireps_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pireps` ADD CONSTRAINT `pireps_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pireps` ADD CONSTRAINT `pireps_aircraftId_fkey` FOREIGN KEY (`aircraftId`) REFERENCES `aircrafts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verification_codes` ADD CONSTRAINT `verification_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
