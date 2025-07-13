import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // Criação do produto
  async create(createProdutoDto: CreateProdutoDto, file: Express.Multer.File) {
    try {
      //Cria o produto no banco
      const product = await this.prisma.produtos.create({
        data: createProdutoDto,
      });

      // Se enviou imagem, salva no disco e atualiza a coluna imageUrl
      if (file) {
        // Pega extensão do arquivo
        const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);

        // Monta nome do arquivo com id
        const fileName = `${product.id}.${fileExtension}`;

        // Caminho físico onde o arquivo será salvo
        const filePath = path.resolve(process.cwd(), 'files/products/images', fileName);

        // Salva o arquivo
        await fs.writeFile(filePath, file.buffer);

        // Atualiza a coluna imageUrl no produto
        await this.prisma.produtos.update({
          where: {
            id: product.id,
          },
          data: {
            imagemUrl: `http://localhost:3000/files/products/images/${fileName}`,
          },
        });
      }

      return {
        ...product,
        preco: Number(product.preco),
      };
    } catch (err) {
      throw new HttpException('Erro ao criar o produto!', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
  /*-----------------Metodos de Busca------------------*/
  async findAll() {
    const product = await this.prisma.produtos.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        categoria: true,
      },
    });

    return product.map((product) => ({
      ...product,
      preco: Number(product.preco),
    }));
  }

  //Busca somente por um ID
  async findOne(id: number) {
    const product = await this.prisma.produtos.findUnique({
      where: {
        id: id,
      },
    });

    if (product) return product;
    // Caso não encontre o produto
    throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
  }

  //Busca um produto seus grupo de complementos e complementos do seu grupo
  async findAddOnGroupAndAddOnsByProductId(id: number) {
    const product = await this.prisma.produtos.findUnique({
      where: {
        id: id,
      },
      include: {
        GrupoComplementos: {
          include: {
            Complementos: true,
          },
        },
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
          nomeProduto: (updateProdutoDto?.nomeProduto as string) ?? findProduct.nomeProduto,
          descricao: updateProdutoDto?.descricao ? updateProdutoDto?.descricao : findProduct.descricao,
          preco: updateProdutoDto?.preco ? updateProdutoDto?.preco : findProduct.preco,
          status: updateProdutoDto.status !== undefined ? updateProdutoDto.status : findProduct.status,
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

      // Verificar se o produto ja foi vendido
      const productSold = await this.prisma.itensPedido.findMany({
        where: {
          idProduto: id,
        },
      });

      // Se encontrar o produto o produto, retorna mensagem
      if (productSold.length > 0) {
        throw new HttpException(`Não é possível deletar o produto pois ele já foi vendido, [PEDIDO]: ${productSold[0].idPedido}`, HttpStatus.CONFLICT);
      }

      // Verificar se o produto esta em um grupo de complementos
      const productInTheComplementsGroup = await this.prisma.grupoComplementos.findMany({
        where: {
          idProduto: id,
        },
      });

      // Se não encontrar o produto, retorna mensagem
      if (productInTheComplementsGroup.length > 0) {
        console.log('Aqui', productInTheComplementsGroup);
        throw new HttpException(
          `Não é possível deletar o produto, pertence ao grupo de complementos: ID: ${productInTheComplementsGroup[0].id} - ${productInTheComplementsGroup[0].nomeGrupoComplementos}`,
          HttpStatus.CONFLICT,
        );
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
      throw new HttpException('Falha ao deletar o produto', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async duplicateProduct(id: number, nomeProduto: string) {
    const nomeProduct = nomeProduto;

    try {
      // Procurar o tem a ser duplicado
      const productOrig = await this.prisma.produtos.findUnique({
        where: {
          id: id,
        },
        include: {
          GrupoComplementos: {
            include: {
              Complementos: true,
            },
          },
        },
      });

      // Se não encontrar o produto, retorna mensagem
      if (!productOrig) {
        throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
      }

      // Verificar se existe o produto com essa mesma descrição
      if (productOrig.nomeProduto.toUpperCase().trim() === nomeProduct.toUpperCase().trim()) {
        throw new HttpException(`Já existe um produto cadastrado com este mesmo nome`, HttpStatus.CONFLICT);
      }

      const { idCategoria, status, preco, descricao, imagemUrl, GrupoComplementos } = productOrig;

      const newProduct = await this.prisma.produtos.create({
        data: {
          nomeProduto: nomeProduct,
          idCategoria: idCategoria,
          descricao: descricao,
          preco: preco,
          status: status,
          imagemUrl,
        },
      });

      // Se tiver grupo de complemtos insere
      if (GrupoComplementos.length) {
        await Promise.all(
          GrupoComplementos.map(async (groupOrig) => {
            // 1. cria o novo grupo
            const newGroup = await this.prisma.grupoComplementos.create({
              data: {
                idProduto: groupOrig.idProduto,
                nomeGrupoComplementos: groupOrig.nomeGrupoComplementos,
                descricao: groupOrig.descricao,
                obrigatorio: groupOrig.obrigatorio,
                qtdMaxComplemento: groupOrig.qtdMaxComplemento,
                qtdMinComplemento: groupOrig.qtdMinComplemento,
              },
            });

            // 2. cria todos os complementos do grupo recém‑criado
            if (groupOrig.Complementos?.length) {
              await Promise.all(
                groupOrig.Complementos.map((compOrig) =>
                  this.prisma.complementos.create({
                    data: {
                      nomeComplemento: compOrig.nomeComplemento,
                      idGrupoComplementos: newGroup.id, // usa o id do grupo novo!
                      descricao: compOrig.descricao,
                      imagemUrl: compOrig.imagemUrl,
                      preco: compOrig.preco,
                      status: compOrig.status,
                    },
                  }),
                ),
              );
            }
            return newGroup;
          }),
        );
      }

      return newProduct;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao deletar o produto', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
}
