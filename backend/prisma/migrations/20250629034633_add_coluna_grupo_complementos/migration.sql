/*
  Warnings:

  - Added the required column `nomeGrupoComplementos` to the `grupocomplementos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grupocomplementos" ADD COLUMN     "nomeGrupoComplementos" VARCHAR(40) NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL,
ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(200);
