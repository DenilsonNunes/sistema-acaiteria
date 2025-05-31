/*
  Warnings:

  - You are about to drop the `itensPedidoVenda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itensPedidoVenda" DROP CONSTRAINT "itensPedidoVenda_idPedido_fkey";

-- DropForeignKey
ALTER TABLE "itensPedidoVenda" DROP CONSTRAINT "itensPedidoVenda_idProduto_fkey";

-- DropTable
DROP TABLE "itensPedidoVenda";

-- CreateTable
CREATE TABLE "itenspedidovenda" (
    "id" SERIAL NOT NULL,
    "preco" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "idProduto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,

    CONSTRAINT "itenspedidovenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
