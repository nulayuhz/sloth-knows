/*
  Warnings:

  - You are about to drop the column `ticker` on the `ScreenerStock` table. All the data in the column will be lost.
  - Added the required column `close` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market_cap_basic` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `ScreenerStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScreenerStock" DROP COLUMN "ticker",
ADD COLUMN     "close" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "market_cap_basic" BIGINT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "volume" BIGINT NOT NULL;
