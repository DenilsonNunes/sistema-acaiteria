-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "idCliente" INTEGER,
    "idUsuario" INTEGER,
    "observacao" VARCHAR(250) NOT NULL,
    "valorTotal" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itenspedidovenda" (
    "id" SERIAL NOT NULL,
    "preco" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "idProduto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,

    CONSTRAINT "itenspedidovenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
