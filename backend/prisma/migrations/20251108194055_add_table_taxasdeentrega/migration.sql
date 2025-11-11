-- CreateTable
CREATE TABLE "TaxasDeEntrega" (
    "id" SERIAL NOT NULL,
    "bairroRegiao" VARCHAR(80) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxasDeEntrega_pkey" PRIMARY KEY ("id")
);
