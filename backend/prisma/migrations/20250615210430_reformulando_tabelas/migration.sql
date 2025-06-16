-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "usuario" VARCHAR(15) NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "apelido" VARCHAR(120),
    "endereco" VARCHAR(250),
    "fone" VARCHAR(15),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "idCategoria" INTEGER,
    "idGrupoComplementos" INTEGER,
    "nomeProduto" VARCHAR(80) NOT NULL,
    "descricao" VARCHAR(1000) NOT NULL,
    "preco" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "imagemUrl" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupocomplementos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "obrigatorio" BOOLEAN NOT NULL,
    "qtdMinComplemento" INTEGER NOT NULL,
    "qtdMaxComplemento" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grupocomplementos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complementos" (
    "id" SERIAL NOT NULL,
    "idGrupoComplementos" INTEGER,
    "nomeComplemento" VARCHAR(80) NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "preco" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complementos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "observacao" VARCHAR(250),
    "valorTotal" DECIMAL(10,4) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itenspedidovenda" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(10,4) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "itenspedidovenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_idGrupoComplementos_fkey" FOREIGN KEY ("idGrupoComplementos") REFERENCES "grupocomplementos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complementos" ADD CONSTRAINT "complementos_idGrupoComplementos_fkey" FOREIGN KEY ("idGrupoComplementos") REFERENCES "grupocomplementos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itenspedidovenda" ADD CONSTRAINT "itenspedidovenda_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
