-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bg_image_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bg_image_id_fkey" FOREIGN KEY ("bg_image_id") REFERENCES "Bg_Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
