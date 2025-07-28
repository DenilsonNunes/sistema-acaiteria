-- DropForeignKey
ALTER TABLE "pedido_produto_complementos" DROP CONSTRAINT "pedido_produto_complementos_idProdutoPedido_fkey";

-- AddForeignKey
ALTER TABLE "pedido_produto_complementos" ADD CONSTRAINT "pedido_produto_complementos_idProdutoPedido_fkey" FOREIGN KEY ("idProdutoPedido") REFERENCES "pedido_produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
