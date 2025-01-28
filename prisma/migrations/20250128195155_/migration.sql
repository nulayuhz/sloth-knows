-- CreateTable
CREATE TABLE "StockAnalysis" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "screenerStockId" INTEGER NOT NULL,

    CONSTRAINT "StockAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockAnalysis_screenerStockId_key" ON "StockAnalysis"("screenerStockId");

-- AddForeignKey
ALTER TABLE "StockAnalysis" ADD CONSTRAINT "StockAnalysis_screenerStockId_fkey" FOREIGN KEY ("screenerStockId") REFERENCES "ScreenerStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
