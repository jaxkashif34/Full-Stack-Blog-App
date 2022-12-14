/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `asset_id` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `bytes` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `original_filename` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `secure_url` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Profile_pic` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Bg_Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `body` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetId` to the `Profile_pic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Profile_pic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secureUrl` to the `Profile_pic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DOB` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bg_Image" DROP CONSTRAINT "Bg_Image_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile_pic" DROP COLUMN "asset_id",
DROP COLUMN "bytes",
DROP COLUMN "created_at",
DROP COLUMN "height",
DROP COLUMN "original_filename",
DROP COLUMN "secure_url",
DROP COLUMN "width",
ADD COLUMN     "assetId" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "secureUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_of_birth",
ADD COLUMN     "DOB" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Bg_Image";

-- CreateTable
CREATE TABLE "BgImage" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "BgImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BgImage_postId_key" ON "BgImage"("postId");

-- AddForeignKey
ALTER TABLE "BgImage" ADD CONSTRAINT "BgImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
