/*
  Warnings:

  - Made the column `trackerId` on table `pireps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pireps` MODIFY `trackerId` VARCHAR(191) NOT NULL;
