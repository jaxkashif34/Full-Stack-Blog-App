/*
  Warnings:

  - You are about to drop the column `userPreferenceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPreferenceId_fkey";

-- DropIndex
DROP INDEX "User_userPreferenceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userPreferenceId",
ADD COLUMN     "emailUpdates" BOOLEAN;

-- DropTable
DROP TABLE "UserPreferences";
