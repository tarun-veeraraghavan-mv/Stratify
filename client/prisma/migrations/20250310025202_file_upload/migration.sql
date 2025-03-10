/*
  Warnings:

  - Added the required column `userId` to the `FileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUpload" ADD COLUMN     "userId" INTEGER NOT NULL;
