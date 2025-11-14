-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "valorSubTotal" DECIMAL(10,4) NOT NULL DEFAULT 0,
ADD COLUMN     "valorTaxaDeEntrega" DECIMAL(10,4);
