/*
  Warnings:

  - You are about to drop the column `profile_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_url";

-- CreateTable
CREATE TABLE "Profile_Pic" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 700,
    "height" INTEGER NOT NULL DEFAULT 700,
    "asset_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "bytes" INTEGER NOT NULL,
    "secure_url" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_Pic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_Pic_user_id_key" ON "Profile_Pic"("user_id");

-- AddForeignKey
ALTER TABLE "Profile_Pic" ADD CONSTRAINT "Profile_Pic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
