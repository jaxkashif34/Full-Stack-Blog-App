/*
  Warnings:

  - Made the column `userId` on table `Profile_pic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile_pic" ALTER COLUMN "userId" SET NOT NULL;
