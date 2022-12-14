/*
  Warnings:

  - You are about to drop the `Categoty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategotyToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategotyToPost" DROP CONSTRAINT "_CategotyToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategotyToPost" DROP CONSTRAINT "_CategotyToPost_B_fkey";

-- DropTable
DROP TABLE "Categoty";

-- DropTable
DROP TABLE "_CategotyToPost";

-- DropEnum
DROP TYPE "categoryRole";
