/*
  Warnings:

  - Made the column `bg_image_id` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profile_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bg_image_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "bg_image_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile_pic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bg_image_id_fkey" FOREIGN KEY ("bg_image_id") REFERENCES "Bg_Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
