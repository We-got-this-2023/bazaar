/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shippingMethodId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
ADD COLUMN     "imagesPath" TEXT[],
ADD COLUMN     "shippingMethodId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "userRating" DOUBLE PRECISION NOT NULL,
    "userComment" TEXT NOT NULL,
    "commentAmount" INTEGER NOT NULL,
    "commentLikes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResponse" (
    "id" SERIAL NOT NULL,
    "productReviewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "responseLikes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCartProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingCartProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCart" (
    "id" SERIAL NOT NULL,
    "cartProductId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" SERIAL NOT NULL,
    "shipper" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "unitNumber" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPaymentMethod" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "expiryDate" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "shippingAddressId" INTEGER NOT NULL,
    "shippingMethodId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "ShippingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponse" ADD CONSTRAINT "UserResponse_productReviewId_fkey" FOREIGN KEY ("productReviewId") REFERENCES "ProductReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponse" ADD CONSTRAINT "UserResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCartProduct" ADD CONSTRAINT "ShoppingCartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_cartProductId_fkey" FOREIGN KEY ("cartProductId") REFERENCES "ShoppingCartProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "UserPaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "ShippingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
