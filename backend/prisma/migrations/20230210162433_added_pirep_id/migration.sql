/*
  Warnings:

  - Added the required column `pirepId` to the `pireps_route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pireps_route` ADD COLUMN `pirepId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `pireps_route` ADD CONSTRAINT `pireps_route_pirepId_fkey` FOREIGN KEY (`pirepId`) REFERENCES `pireps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
