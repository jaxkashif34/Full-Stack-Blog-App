-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bg_image_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "bg_image_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bg_image_id_fkey" FOREIGN KEY ("bg_image_id") REFERENCES "Bg_Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
