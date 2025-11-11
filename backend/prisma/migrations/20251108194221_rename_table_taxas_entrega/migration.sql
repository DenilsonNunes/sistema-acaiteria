/*
  Warnings:

  - You are about to drop the `TaxasDeEntrega` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TaxasDeEntrega";

-- CreateTable
CREATE TABLE "taxas_entrega" (
    "id" SERIAL NOT NULL,
    "bairroRegiao" VARCHAR(80) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taxas_entrega_pkey" PRIMARY KEY ("id")
);
