/*
  Warnings:

  - The primary key for the `Tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id");
