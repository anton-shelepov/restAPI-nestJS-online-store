/*
  Warnings:

  - Added the required column `categoryCatalogName` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "categoryCatalogName" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;
