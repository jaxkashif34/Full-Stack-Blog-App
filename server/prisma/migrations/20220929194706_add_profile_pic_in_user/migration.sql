/*
  Warnings:

  - You are about to drop the `Profile_Pic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile_Pic" DROP CONSTRAINT "Profile_Pic_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic" TEXT;

-- DropTable
DROP TABLE "Profile_Pic";
