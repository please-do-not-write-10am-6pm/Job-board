-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "role" SET DATA TYPE TEXT;
