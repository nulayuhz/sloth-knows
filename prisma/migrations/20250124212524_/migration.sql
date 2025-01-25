/*
  Warnings:

  - Added the required column `screenerId` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScreenerStock" ADD COLUMN     "screenerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Screener" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Screener_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScreenerStock" ADD CONSTRAINT "ScreenerStock_screenerId_fkey" FOREIGN KEY ("screenerId") REFERENCES "Screener"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
