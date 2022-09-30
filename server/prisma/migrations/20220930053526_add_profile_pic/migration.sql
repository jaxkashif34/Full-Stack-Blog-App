/*
  Warnings:

  - You are about to drop the column `profile_pic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_pic";

-- CreateTable
CREATE TABLE "Profile_pic" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 700,
    "height" INTEGER NOT NULL DEFAULT 700,
    "asset_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "bytes" INTEGER NOT NULL,
    "secure_url" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_pic_user_id_key" ON "Profile_pic"("user_id");

-- AddForeignKey
ALTER TABLE "Profile_pic" ADD CONSTRAINT "Profile_pic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
