/*
  Warnings:

  - You are about to drop the column `bg_image_id` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id]` on the table `Bg_Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `Bg_Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bg_image_id_fkey";

-- DropIndex
DROP INDEX "Post_bg_image_id_key";

-- AlterTable
ALTER TABLE "Bg_Image" ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bg_image_id";

-- CreateIndex
CREATE UNIQUE INDEX "Bg_Image_post_id_key" ON "Bg_Image"("post_id");

-- AddForeignKey
ALTER TABLE "Bg_Image" ADD CONSTRAINT "Bg_Image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
