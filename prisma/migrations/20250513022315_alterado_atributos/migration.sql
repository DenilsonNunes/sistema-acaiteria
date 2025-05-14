/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `produtos` table. All the data in the column will be lost.
  - Made the column `idCliente` on table `pedidos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idUsuario` on table `pedidos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoriaId_fkey";

-- AlterTable
ALTER TABLE "pedidos" ALTER COLUMN "idCliente" SET NOT NULL,
ALTER COLUMN "idUsuario" SET NOT NULL;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "categoriaId",
ADD COLUMN     "idCategoria" INTEGER;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
