/*
  Warnings:

  - You are about to drop the column `specGroupValues` on the `specs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "specs" DROP COLUMN "specGroupValues";

-- CreateTable
CREATE TABLE "specGroupValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT[],
    "specGroupId" INTEGER NOT NULL,

    CONSTRAINT "specGroupValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specGroupValue" ADD CONSTRAINT "specGroupValue_specGroupId_fkey" FOREIGN KEY ("specGroupId") REFERENCES "specs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
