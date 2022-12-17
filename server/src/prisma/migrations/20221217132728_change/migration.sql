/*
  Warnings:

  - You are about to drop the `PpostImg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PpostImg" DROP CONSTRAINT "PpostImg_postId_fkey";

-- DropTable
DROP TABLE "PpostImg";

-- CreateTable
CREATE TABLE "PostImg" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostImg_postId_key" ON "PostImg"("postId");

-- AddForeignKey
ALTER TABLE "PostImg" ADD CONSTRAINT "PostImg_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
