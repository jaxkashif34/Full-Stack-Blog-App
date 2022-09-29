/*
  Warnings:

  - Made the column `bg_image` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "bg_image" SET NOT NULL;

-- CreateTable
CREATE TABLE "Bg_Image" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 700,
    "height" INTEGER NOT NULL DEFAULT 700,
    "asset_id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "bytes" INTEGER NOT NULL,
    "secure_url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,

    CONSTRAINT "Bg_Image_pkey" PRIMARY KEY ("id")
);
