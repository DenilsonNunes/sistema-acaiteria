/*
  Warnings:

  - You are about to drop the `itenspedidovenda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itenspedidovenda" DROP CONSTRAINT "itenspedidovenda_idPedido_fkey";

-- DropForeignKey
ALTER TABLE "itenspedidovenda" DROP CONSTRAINT "itenspedidovenda_idProduto_fkey";

-- DropTable
DROP TABLE "itenspedidovenda";

-- CreateTable
CREATE TABLE "itensPedidoVenda" (
    "id" SERIAL NOT NULL,
    "preco" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "idProduto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,

    CONSTRAINT "itensPedidoVenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itensPedidoVenda" ADD CONSTRAINT "itensPedidoVenda_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensPedidoVenda" ADD CONSTRAINT "itensPedidoVenda_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
