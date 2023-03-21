/*
  Warnings:

  - You are about to drop the column `categoryDescription` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryDescription",
ADD COLUMN     "description" TEXT;
