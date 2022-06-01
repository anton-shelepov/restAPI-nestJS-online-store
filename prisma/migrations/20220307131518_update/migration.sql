/*
  Warnings:

  - The `value` column on the `specGroupValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "specGroupValue" DROP CONSTRAINT "specGroupValue_specGroupId_fkey";

-- AlterTable
ALTER TABLE "specGroupValue" DROP COLUMN "value",
ADD COLUMN     "value" TEXT[],
ALTER COLUMN "specGroupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "specGroupValue" ADD CONSTRAINT "specGroupValue_specGroupId_fkey" FOREIGN KEY ("specGroupId") REFERENCES "specs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
