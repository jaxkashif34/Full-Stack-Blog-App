/*
  Warnings:

  - You are about to drop the column `post_id` on the `Bg_Image` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Profile_pic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bg_image_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bg_image_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bg_Image" DROP CONSTRAINT "Bg_Image_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile_pic" DROP CONSTRAINT "Profile_pic_user_id_fkey";

-- DropIndex
DROP INDEX "Bg_Image_post_id_key";

-- DropIndex
DROP INDEX "Profile_pic_user_id_key";

-- AlterTable
ALTER TABLE "Bg_Image" DROP COLUMN "post_id";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bg_image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile_pic" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_bg_image_id_key" ON "Post"("bg_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_id_key" ON "User"("profile_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile_pic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bg_image_id_fkey" FOREIGN KEY ("bg_image_id") REFERENCES "Bg_Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
