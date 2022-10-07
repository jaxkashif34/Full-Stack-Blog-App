/*
  Warnings:

  - You are about to drop the column `profile_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile_pic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile_pic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_id_fkey";

-- DropIndex
DROP INDEX "User_profile_id_key";

-- AlterTable
ALTER TABLE "Profile_pic" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_id";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_pic_userId_key" ON "Profile_pic"("userId");

-- AddForeignKey
ALTER TABLE "Profile_pic" ADD CONSTRAINT "Profile_pic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
