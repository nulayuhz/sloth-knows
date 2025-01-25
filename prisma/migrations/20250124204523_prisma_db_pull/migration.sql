-- CreateTable
CREATE TABLE "ScreenerStock" (
    "id" SERIAL NOT NULL,
    "screenerStockId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "potential" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ScreenerStock_pkey" PRIMARY KEY ("id")
);
