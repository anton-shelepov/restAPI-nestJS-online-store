/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_productId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_userId_fkey";

-- DropTable
DROP TABLE "image";

-- CreateTable
CREATE TABLE "profileImage" (
    "fileName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "profileImage_pkey" PRIMARY KEY ("fileName")
);

-- CreateTable
CREATE TABLE "productImage" (
    "fileName" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "productImage_pkey" PRIMARY KEY ("fileName")
);

-- CreateIndex
CREATE UNIQUE INDEX "profileImage_userId_key" ON "profileImage"("userId");

-- AddForeignKey
ALTER TABLE "profileImage" ADD CONSTRAINT "profileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
