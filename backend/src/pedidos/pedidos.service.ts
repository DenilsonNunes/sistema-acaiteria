import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto, payloadParam: JwtPayload) {
    try {
      // Verifica se existe o usuário
      const user = await this.prisma.usuarios.findUnique({
        where: {
          id: payloadParam.user,
        },
      });
      if (!user) {
        throw new HttpException('Usuário não existe', HttpStatus.NOT_FOUND);
      }

      // Verifica se o cliente existe
      const customer = await this.prisma.clientes.findUnique({
        where: {
          id: 1, //createPedidoDto.idCliente,
        },
      });
      if (!customer) {
        throw new HttpException('Cliente não existe', HttpStatus.NOT_FOUND);
      }

      if (createPedidoDto.itensPedido) {
        // Obtem os Ids dos produtos que veio na requisição
        const idsProduct = createPedidoDto.itensPedido.map((item) => item.idProduto);

        // Realiza consulta, e retorna somente os produtos que estão cadastrados
        const existingProducts = await this.prisma.produtos.findMany({
          where: {
            id: {
              in: idsProduct, // idsProdutos é um array de IDs de produtos
            },
          },
          select: {
            id: true,
          },
        });

        // Obtem os Ids dos produtos que foram encontrados
        const idsExistingProducts = existingProducts.map((produto) => produto.id);

        // Verifica se há produtos que não existem
        const productsNotFound = idsProduct.filter((id) => !idsExistingProducts.includes(id));

        // Retorna caso houver produtos que não foram encontrados
        if (productsNotFound.length > 0) {
          throw new HttpException(`Os seguintes produtos não foram encontrados: ${productsNotFound.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
      }

      // Verificar se existem complementos nos produtos do pedido
      if (createPedidoDto.itensPedido) {
        const idsAddOns = createPedidoDto.itensPedido.flatMap((item) => {
          if (item.complementos) {
            return item.complementos.map((compl) => compl.idComplemento);
          }
          return []; // se não tiver complementos
        });

        // Realiza consulta, e retorna somente os complementos que estão cadastrados
        const existingAddOns = await this.prisma.complementos.findMany({
          where: {
            id: {
              in: idsAddOns, // idsProdutos é um array de IDs de produtos
            },
          },
          select: {
            id: true,
          },
        });

        // Obtem os Ids dos complementos que foram encontrados
        const idsExistingAddOns = existingAddOns.map((addOns) => addOns.id);

        // Verifica se há complementos que não existem
        const addOnsNotFound = idsAddOns.filter((id) => !idsExistingAddOns.includes(id));

        // Retorna caso houver produtos que não foram encontrados
        if (addOnsNotFound.length > 0) {
          throw new HttpException(`Os seguintes complementos não foram encontrados: ${addOnsNotFound.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
      }

      const order = await this.prisma.pedidos.create({
        data: {
          idCliente: createPedidoDto.idCliente,
          idUsuario: payloadParam.user,
          observacao: createPedidoDto.observacao,
          valorTotal: createPedidoDto.valorTotal,
          // Produtos do pedido
          itensPedido: {
            create: createPedidoDto.itensPedido.map((produto) => ({
              idProduto: produto.idProduto,
              quantidade: produto.quantidade,
              precoUnitario: produto.precoUnitario,
              complementosItem: produto.complementos?.length
                ? // Caso houver complementos nos produtos, insere
                  {
                    create: produto.complementos.map((complemento) => ({
                      idComplemento: complemento.idComplemento,
                      quantidade: complemento.quantidade,
                      precoUnitario: complemento.precoUnitario,
                    })),
                  }
                : undefined,
            })),
          },
        },
        include: {
          itensPedido: {
            include: {
              complementosItem: true,
            },
          },
        },
      });

      return order;
    } catch (err) {
      console.log('Qual o erro?', err);
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao criar o pedido', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.pedidos.findMany();
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.pedidos.findUnique({
        where: {
          id: id,
        },
      });

      if (order) return order;

      throw new HttpException('O Pedido não foi encontrado', HttpStatus.NOT_FOUND);
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao buscar o pedido.', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto, payloadParam: JwtPayload) {
    try {
      const findOrder = await this.prisma.pedidos.findUnique({
        where: {
          id: id,
        },
      });

      if (!findOrder) {
        throw new HttpException('O Pedido não foi encontrado', HttpStatus.NOT_FOUND);
      }

      const updateOrder = this.prisma.$transaction(async (tx) => {
        // Deletar todos itens do pedido
        await tx.pedidoProdutos.deleteMany({
          where: {
            idPedido: id,
          },
        });

        // Verificar se 'itensPedidoVenda' foi fornecido
        const itens = updatePedidoDto.itensPedido || []; // Valor padrão vazio caso não tenha sido enviado

        return await tx.pedidos.update({
          where: {
            id: id,
          },
          data: {
            idCliente: 1, //updatePedidoDto.idCliente,
            idUsuario: payloadParam.user,
            observacao: updatePedidoDto.observacao,
            valorTotal: updatePedidoDto.valorTotal,
            data_alteracao: new Date(),
            itensPedido: {
              create: itens.map((item) => ({
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
              })),
            },
          },
          include: {
            itensPedido: true,
          },
        });
      });

      return updateOrder;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao alterar o pedido.', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      // Verifica se o pedido existe
      const findOrder = await this.prisma.pedidos.findUnique({
        where: {
          id: id,
        },
      });
      // Se não existir retorna mensagem
      if (!findOrder) {
        throw new HttpException('O Pedido não foi encontrado', HttpStatus.NOT_FOUND);
      }
      //Deleta o pedido caso exista
      await this.prisma.pedidos.delete({
        where: {
          id: id,
        },
      });
      return { message: 'Pedido deletado com sucesso.' };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao deletar pedido', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }
}
