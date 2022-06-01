/*
  Warnings:

  - You are about to drop the `specGroupValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "specGroupValue" DROP CONSTRAINT "specGroupValue_specGroupId_fkey";

-- AlterTable
ALTER TABLE "specs" ADD COLUMN     "specGroupValues" TEXT[];

-- DropTable
DROP TABLE "specGroupValue";
