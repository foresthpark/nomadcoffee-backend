/*
  Warnings:

  - You are about to drop the column `coffeeShopId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_CoffeeShopToCoffeeShopPhoto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `CoffeeShopPhoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" DROP CONSTRAINT "_CoffeeShopToCoffeeShopPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" DROP CONSTRAINT "_CoffeeShopToCoffeeShopPhoto_B_fkey";

-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "CoffeeShop_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "coffeeShopId",
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShop" ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_CoffeeShopToCoffeeShopPhoto";

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShopPhoto_url_key" ON "CoffeeShopPhoto"("url");

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
