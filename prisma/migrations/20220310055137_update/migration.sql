/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryName_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryName");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "categories"("categoryName") ON DELETE SET NULL ON UPDATE CASCADE;
