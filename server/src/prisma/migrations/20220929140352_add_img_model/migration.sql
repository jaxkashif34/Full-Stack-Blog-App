/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bg_Image` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Bg_Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bg_Image" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TEXT NOT NULL;
