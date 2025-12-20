/*
  Warnings:

  - You are about to drop the column `interactionType` on the `tracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `note` MODIFY `body` TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `tracker` DROP COLUMN `interactionType`;
