/*
  Warnings:

  - You are about to drop the column `preco` on the `itenspedidovenda` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `itenspedidovenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itenspedidovenda" DROP COLUMN "preco",
ADD COLUMN     "precoUnitario" DECIMAL(10,4) NOT NULL DEFAULT 0,
ADD COLUMN     "quantidade" INTEGER NOT NULL;
