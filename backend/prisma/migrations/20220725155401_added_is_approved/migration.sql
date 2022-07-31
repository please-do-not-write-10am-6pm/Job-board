/*
  Warnings:

  - Added the required column `isApproved` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isApproved` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isApproved" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isApproved" BOOLEAN NOT NULL;
