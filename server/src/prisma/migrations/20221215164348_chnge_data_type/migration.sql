/*
  Warnings:

  - Changed the type of `iat` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exp` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "iat",
ADD COLUMN     "iat" INTEGER NOT NULL,
DROP COLUMN "exp",
ADD COLUMN     "exp" INTEGER NOT NULL;
