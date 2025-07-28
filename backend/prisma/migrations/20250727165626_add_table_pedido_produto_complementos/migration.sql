-- CreateTable
CREATE TABLE "pedido_produto_complementos" (
    "id" SERIAL NOT NULL,
    "idComplemento" INTEGER NOT NULL,
    "idProdutoPedido" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(10,4) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "pedido_produto_complementos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_produto_complementos" ADD CONSTRAINT "pedido_produto_complementos_idComplemento_fkey" FOREIGN KEY ("idComplemento") REFERENCES "complementos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produto_complementos" ADD CONSTRAINT "pedido_produto_complementos_idProdutoPedido_fkey" FOREIGN KEY ("idProdutoPedido") REFERENCES "pedido_produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
