/*
  Warnings:

  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN');

-- CreateEnum
CREATE TYPE "categoryRole" AS ENUM ('Programming', 'General', 'Memes');

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_ownerId_fkey";

-- DropTable
DROP TABLE "car";

-- DropTable
DROP TABLE "person";

-- CreateTable
CREATE TABLE "Categoty" (
    "id" TEXT NOT NULL,
    "name" "categoryRole" NOT NULL DEFAULT 'General',

    CONSTRAINT "Categoty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "autherId" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "age" INTEGER NOT NULL,
    "userPreferenceId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "emailUpdates" BOOLEAN NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategotyToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoty_name_key" ON "Categoty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_tags_key" ON "Post"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPreferenceId_key" ON "User"("userPreferenceId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_email_key" ON "User"("name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "_CategotyToPost_AB_unique" ON "_CategotyToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategotyToPost_B_index" ON "_CategotyToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToUser_AB_unique" ON "_PostToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToUser_B_index" ON "_PostToUser"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "UserPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategotyToPost" ADD CONSTRAINT "_CategotyToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategotyToPost" ADD CONSTRAINT "_CategotyToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToUser" ADD CONSTRAINT "_PostToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToUser" ADD CONSTRAINT "_PostToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
