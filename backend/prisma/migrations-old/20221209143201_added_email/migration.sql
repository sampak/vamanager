/*
  Warnings:

  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NOT NULL;
