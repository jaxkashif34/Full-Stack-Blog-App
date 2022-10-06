-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_name_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailUpdates" SET DEFAULT false;
