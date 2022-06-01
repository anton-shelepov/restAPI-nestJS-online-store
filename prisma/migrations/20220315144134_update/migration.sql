/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `products` table. All the data in the column will be lost.
  - The primary key for the `profileImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[categoryName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryName_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "productImage" DROP CONSTRAINT "productImage_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "productImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" INTEGER;

-- AlterTable
ALTER TABLE "profileImage" DROP CONSTRAINT "profileImage_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "profileImage_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
