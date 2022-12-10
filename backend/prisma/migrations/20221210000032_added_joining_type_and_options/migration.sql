/*
  Warnings:

  - Added the required column `options` to the `Airlines` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Airlines_baseId_fkey` ON `airlines`;

-- AlterTable
ALTER TABLE `airlines` ADD COLUMN `options` JSON NOT NULL;

-- AddForeignKey
ALTER TABLE `Airlines` ADD CONSTRAINT `Airlines_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
