import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prisma.categorias.create({
        data: createCategoriaDto,
      });
    } catch (err) {
      throw new HttpException('Erro ao criar a categoria!', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  // Buscar todas as categotias
  async findAll() {
    return await this.prisma.categorias.findMany({
      include: {
        produtos: true,
      },
    });
  }

  // Buscar uma categoria
  async findOne(id: number) {
    const category = await this.prisma.categorias.findUnique({
      where: {
        id: id,
      },
    });

    if (category) return;
    // Caso não encontre
    throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      // Busca a categoria
      const findCategory = await this.prisma.categorias.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar, retorna mensagem para o usuário
      if (!findCategory) {
        throw new HttpException('A Categoria não foi encontrada.', HttpStatus.NOT_FOUND);
      }
      // Se encontrou, atualiza a categoria com as informações que o usuário passou
      const category = await this.prisma.categorias.update({
        where: {
          id: id,
        },
        data: {
          descricao: updateCategoriaDto?.descricao ? updateCategoriaDto?.descricao : findCategory.descricao,
        },
      });
      // Retorna o produto
      return category;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao atualizar a categoria.', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      // Busca categoria
      const findCategory = await this.prisma.categorias.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar a categoria, retorna mensagem
      if (!findCategory) {
        throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);
      }

      // Busca todas os produtos com essa categoria
      const productSold = await this.prisma.produtos.findMany({
        where: {
          idCategoria: id,
          pedidoProdutos: {
            some: {},
          },
        },
      });

      // Se não encontrar o produto, retorna mensagem
      if (productSold.length > 0) {
        throw new HttpException(`Não é possível excluir esta categoria. Ela está vinculada a produtos que já foram vendidos.`, HttpStatus.CONFLICT);
      }

      // Deleta o produto
      await this.prisma.categorias.delete({
        where: {
          id: id,
        },
      });

      return { message: 'Categoria deletada com sucesso.' };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao deletar a categoria.', HttpStatus.BAD_REQUEST);
    }
  }
}
