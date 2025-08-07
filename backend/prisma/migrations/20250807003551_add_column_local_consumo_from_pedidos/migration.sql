/*
  Warnings:

  - Added the required column `local_consumo` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `pedidos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomeCliente` on table `pedidos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "local_consumo" INTEGER NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "nomeCliente" SET NOT NULL;
