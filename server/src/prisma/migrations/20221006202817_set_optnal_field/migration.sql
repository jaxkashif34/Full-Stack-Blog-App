-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile_pic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
