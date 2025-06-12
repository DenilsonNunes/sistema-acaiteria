/*
  Warnings:

  - You are about to drop the column `qtdAcompahamentos` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "qtdAcompahamentos",
ADD COLUMN     "qtdAcompanhamentos" INTEGER;
