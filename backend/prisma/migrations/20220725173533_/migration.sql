/*
  Warnings:

  - You are about to drop the column `approved` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "approved",
ALTER COLUMN "isApproved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "approved",
ALTER COLUMN "isApproved" SET DEFAULT false;
