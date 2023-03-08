/*
  Warnings:

  - The values [NEW_ARRIVALS,FEATURED] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pedding,Delivered,Cancelled,Successful] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `orderId` on the `goods` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `goods` table. All the data in the column will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `designerId` to the `goods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `goods` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `goods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('MEN', 'WOMEN', 'KIDS', 'ACCESSORIES');
ALTER TABLE "goods" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_goodId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "goods" DROP CONSTRAINT "goods_id_fkey";

-- DropForeignKey
ALTER TABLE "goods" DROP CONSTRAINT "goods_orderId_fkey";

-- AlterTable
ALTER TABLE "goods" DROP COLUMN "orderId",
DROP COLUMN "size",
ADD COLUMN     "designerId" INTEGER NOT NULL,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PROCESSING';

-- DropTable
DROP TABLE "OrderItem";

-- CreateTable
CREATE TABLE "_OrderToGood" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToGood_AB_unique" ON "_OrderToGood"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToGood_B_index" ON "_OrderToGood"("B");

-- AddForeignKey
ALTER TABLE "goods" ADD CONSTRAINT "goods_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "designers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToGood" ADD CONSTRAINT "_OrderToGood_A_fkey" FOREIGN KEY ("A") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToGood" ADD CONSTRAINT "_OrderToGood_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
