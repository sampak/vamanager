/*
  Warnings:

  - Added the required column `eventType` to the `tracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tracker` ADD COLUMN `eventType` VARCHAR(191) NOT NULL;
