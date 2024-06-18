/*
  Warnings:

  - You are about to drop the column `namaSurveyor` on the `surveys` table. All the data in the column will be lost.
  - Added the required column `pic` to the `surveys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "namaSurveyor",
ADD COLUMN     "kapri" TEXT[],
ADD COLUMN     "pic" TEXT NOT NULL;
