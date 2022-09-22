/*
  Warnings:

  - A unique constraint covering the columns `[autherId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_autherId_key" ON "Post"("autherId");
