/*
  Warnings:

  - You are about to drop the column `originalName` on the `Bg_Image` table. All the data in the column will be lost.
  - Added the required column `original_filename` to the `Bg_Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bg_Image" DROP COLUMN "originalName",
ADD COLUMN     "original_filename" TEXT NOT NULL;
