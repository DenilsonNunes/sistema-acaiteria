import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // Criação do produto
  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const product = await this.prisma.produtos.create({
        data: createProdutoDto,
      });
      return product;
    } catch (err) {
      throw new HttpException('Erro ao criar o produto!', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
  /*-----------------Metodos de Busca------------------*/
  async findAll() {
    return await this.prisma.produtos.findMany();
  }

  // Busca por descrição
  async findByDescription(description: string) {
    const product = await this.prisma.produtos.findMany({
      where: {
        descricao: {
          contains: description,
          mode: 'insensitive', // ignora maiúsculas/minúsculas
        },
      },
    });

    if (product.length > 0) return product;

    throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
  }

  //Busca somente por um ID
  async findOne(id: number) {
    const product = await this.prisma.produtos.findFirst({
      where: {
        id: id,
      },
    });

    if (product) return product;
    // Caso não encontre o produto
    throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
  }
  /*---------------------Fim--------------------------*/

  /*-------------------Metodo Update--------------------*/
  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    try {
      // Busca o produto pelo ID
      const findProduct = await this.prisma.produtos.findUnique({
        where: {
          id: id,
        },
      });
      // Se não encontrar, retorna mensagem para o usuário
      if (!findProduct) {
        throw new HttpException('O Produto não foi encontrado.', HttpStatus.NOT_FOUND);
      }
      // Se encontrou, atualiza o produto com as informações que o usuário passou
      const product = await this.prisma.produtos.update({
        where: {
          id: id,
        },
        data: {
          descricao: updateProdutoDto?.descricao ? updateProdutoDto?.descricao : findProduct.descricao,
          preco: updateProdutoDto?.preco ? updateProdutoDto?.preco : findProduct.preco,
          status: updateProdutoDto?.status ? updateProdutoDto.status : findProduct.status,
          idCategoria: updateProdutoDto.idCategoria ? updateProdutoDto.idCategoria : findProduct.idCategoria,
          data_alteracao: new Date(),
        },
      });
      // Retorna o produto
      return product;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao atualizar produto.', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
  /*---------------------Fim--------------------------*/

  async remove(id: number) {
    try {
      const findProduct = await this.prisma.produtos.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar o produto, retorna mensagem
      if (!findProduct) {
        throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
      }
      // Deleta o produto
      await this.prisma.produtos.delete({
        where: {
          id: id,
        },
      });

      return { message: 'Produto deletado com sucesso.' };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao deletar o produto', HttpStatus.BAD_REQUEST);
    }
  }
}
