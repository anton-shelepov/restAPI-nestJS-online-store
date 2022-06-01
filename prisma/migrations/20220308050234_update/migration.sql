/*
  Warnings:

  - You are about to drop the column `basketId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_basketId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_favoriteId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "basketId",
DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "_basketToproduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_favoriteToproduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_basketToproduct_AB_unique" ON "_basketToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_basketToproduct_B_index" ON "_basketToproduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteToproduct_AB_unique" ON "_favoriteToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteToproduct_B_index" ON "_favoriteToproduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "review_authorId_key" ON "review"("authorId");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_basketToproduct" ADD FOREIGN KEY ("A") REFERENCES "basket"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_basketToproduct" ADD FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteToproduct" ADD FOREIGN KEY ("A") REFERENCES "favorite"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteToproduct" ADD FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
