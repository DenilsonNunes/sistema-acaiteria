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

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
