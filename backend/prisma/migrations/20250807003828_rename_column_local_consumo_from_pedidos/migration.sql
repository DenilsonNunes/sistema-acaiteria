/*
  Warnings:

  - You are about to drop the column `local_consumo` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `localConsumo` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "local_consumo",
ADD COLUMN     "localConsumo" INTEGER NOT NULL;
