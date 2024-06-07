/*
  Warnings:

  - The primary key for the `surveys` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "surveys_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "surveys_id_seq";
