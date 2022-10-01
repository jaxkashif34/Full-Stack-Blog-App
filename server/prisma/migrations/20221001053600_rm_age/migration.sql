/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile_pic" DROP CONSTRAINT "Profile_pic_user_id_fkey";

-- AlterTable
ALTER TABLE "Profile_pic" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age";

-- AddForeignKey
ALTER TABLE "Profile_pic" ADD CONSTRAINT "Profile_pic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
