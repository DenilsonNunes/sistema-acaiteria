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
CREATE TABLE "pedido_produtos" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(10,4) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "pedido_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
