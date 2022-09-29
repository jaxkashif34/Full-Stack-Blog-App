/*
  Warnings:

  - You are about to drop the column `bg_image` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bg_image_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bg_image",
ADD COLUMN     "bg_image_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_bg_image_id_key" ON "Post"("bg_image_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bg_image_id_fkey" FOREIGN KEY ("bg_image_id") REFERENCES "Bg_Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
