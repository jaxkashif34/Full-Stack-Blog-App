/*
  Warnings:

  - You are about to drop the `BgImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BgImage" DROP CONSTRAINT "BgImage_postId_fkey";

-- DropTable
DROP TABLE "BgImage";

-- CreateTable
CREATE TABLE "PpostImg" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PpostImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PpostImg_postId_key" ON "PpostImg"("postId");

-- AddForeignKey
ALTER TABLE "PpostImg" ADD CONSTRAINT "PpostImg_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
