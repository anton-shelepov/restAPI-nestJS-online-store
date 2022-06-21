/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_basketToproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favoriteToproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profileImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specGroupValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "_basketToproduct" DROP CONSTRAINT "_basketToproduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_basketToproduct" DROP CONSTRAINT "_basketToproduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteToproduct" DROP CONSTRAINT "_favoriteToproduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteToproduct" DROP CONSTRAINT "_favoriteToproduct_B_fkey";

-- DropForeignKey
ALTER TABLE "basket" DROP CONSTRAINT "basket_userId_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "productImage" DROP CONSTRAINT "productImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "profileImage" DROP CONSTRAINT "profileImage_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_productId_fkey";

-- DropForeignKey
ALTER TABLE "specGroupValue" DROP CONSTRAINT "specGroupValue_specGroupId_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_productId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- DropTable
DROP TABLE "_basketToproduct";

-- DropTable
DROP TABLE "_favoriteToproduct";

-- DropTable
DROP TABLE "basket";

-- DropTable
DROP TABLE "favorite";

-- DropTable
DROP TABLE "productImage";

-- DropTable
DROP TABLE "profileImage";

-- DropTable
DROP TABLE "review";

-- DropTable
DROP TABLE "specGroupValue";

-- DropTable
DROP TABLE "specs";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "profile_images" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "profile_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baskets" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "baskets_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "favorites" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spec_groups" (
    "id" SERIAL NOT NULL,
    "specGroupTitle" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "spec_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spec_group_values" (
    "id" SERIAL NOT NULL,
    "value" TEXT[],
    "specGroupId" INTEGER,

    CONSTRAINT "spec_group_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usedTerm" TEXT NOT NULL,
    "dignity" TEXT NOT NULL,
    "flaws" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "authorId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BasketToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_images_userId_key" ON "profile_images"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToProduct_AB_unique" ON "_BasketToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToProduct_B_index" ON "_BasketToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToProduct_AB_unique" ON "_FavoriteToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToProduct_B_index" ON "_FavoriteToProduct"("B");

-- AddForeignKey
ALTER TABLE "profile_images" ADD CONSTRAINT "profile_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baskets" ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spec_groups" ADD CONSTRAINT "spec_groups_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spec_group_values" ADD CONSTRAINT "spec_group_values_specGroupId_fkey" FOREIGN KEY ("specGroupId") REFERENCES "spec_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToProduct" ADD FOREIGN KEY ("A") REFERENCES "baskets"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToProduct" ADD FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProduct" ADD FOREIGN KEY ("A") REFERENCES "favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProduct" ADD FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
