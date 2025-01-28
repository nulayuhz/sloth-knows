/*
  Warnings:

  - Added the required column `content` to the `StockAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockAnalysis" ADD COLUMN     "content" TEXT NOT NULL;
