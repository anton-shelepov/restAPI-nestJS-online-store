/*
  Warnings:

  - You are about to drop the column `specSpecGroupTitle` on the `specGroupValue` table. All the data in the column will be lost.
  - The primary key for the `specs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "specGroupValue" DROP CONSTRAINT "specGroupValue_specSpecGroupTitle_fkey";

-- AlterTable
ALTER TABLE "specGroupValue" DROP COLUMN "specSpecGroupTitle",
ADD COLUMN     "specGroupId" INTEGER;

-- AlterTable
ALTER TABLE "specs" DROP CONSTRAINT "specs_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "specs_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "specGroupValue" ADD CONSTRAINT "specGroupValue_specGroupId_fkey" FOREIGN KEY ("specGroupId") REFERENCES "specs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
