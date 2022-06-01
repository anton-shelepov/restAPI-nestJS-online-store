/*
  Warnings:

  - You are about to drop the column `images` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "image" (
    "originalName" TEXT NOT NULL,
    "productId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "image_pkey" PRIMARY KEY ("originalName")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_userId_key" ON "image"("userId");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
