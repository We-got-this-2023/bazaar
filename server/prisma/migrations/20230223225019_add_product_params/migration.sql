/*
  Warnings:

  - You are about to drop the column `tag` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];
