/*
  Warnings:

  - You are about to drop the `_CategoryToCoffeeShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "coffeeShopId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToCoffeeShop";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
