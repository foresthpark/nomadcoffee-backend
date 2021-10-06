/*
  Warnings:

  - Made the column `userId` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coffeeShopId` on table `CoffeeShopPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShop" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ALTER COLUMN "coffeeShopId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CoffeeShopToCoffeeShopPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeShopToCoffeeShopPhoto_AB_unique" ON "_CoffeeShopToCoffeeShopPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeShopToCoffeeShopPhoto_B_index" ON "_CoffeeShopToCoffeeShopPhoto"("B");

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD CONSTRAINT "CoffeeShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" ADD FOREIGN KEY ("A") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" ADD FOREIGN KEY ("B") REFERENCES "CoffeeShopPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
