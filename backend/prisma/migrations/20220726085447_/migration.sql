/*
  Warnings:

  - Added the required column `jobId` to the `Bids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bids" ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
