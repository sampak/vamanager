/*
  Warnings:

  - You are about to drop the column `pirepId` on the `tracker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tracker` DROP FOREIGN KEY `tracker_pirepId_fkey`;

-- AlterTable
ALTER TABLE `tracker` DROP COLUMN `pirepId`;
