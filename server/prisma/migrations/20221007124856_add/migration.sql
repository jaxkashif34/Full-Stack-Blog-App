-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_autherId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile_pic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
