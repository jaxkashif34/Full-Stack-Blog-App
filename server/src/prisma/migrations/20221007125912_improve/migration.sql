-- DropForeignKey
ALTER TABLE "Profile_pic" DROP CONSTRAINT "Profile_pic_userId_fkey";

-- AddForeignKey
ALTER TABLE "Profile_pic" ADD CONSTRAINT "Profile_pic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
