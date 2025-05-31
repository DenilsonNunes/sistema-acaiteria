-- DropForeignKey
ALTER TABLE "itenspedidovenda" DROP CONSTRAINT "itenspedidovenda_idPedido_fkey";

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
