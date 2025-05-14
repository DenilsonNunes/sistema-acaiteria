-- AlterTable
ALTER TABLE "itenspedidovenda" ALTER COLUMN "precoUnitario" DROP DEFAULT,
ALTER COLUMN "quantidade" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "pedidos" ALTER COLUMN "valorTotal" DROP DEFAULT;
