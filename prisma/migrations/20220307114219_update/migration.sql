/*
  Warnings:

  - The primary key for the `specGroupValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `specTitle` column on the `specGroupValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specValue` column on the `specGroupValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "specGroupValue" DROP CONSTRAINT "specGroupValue_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "specTitle",
ADD COLUMN     "specTitle" TEXT[],
DROP COLUMN "specValue",
ADD COLUMN     "specValue" TEXT[],
ADD CONSTRAINT "specGroupValue_pkey" PRIMARY KEY ("id");
