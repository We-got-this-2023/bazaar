/*
  Warnings:

  - You are about to drop the column `catoegoryId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catoegoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "catoegoryId",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
