import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { getLocalDate } from 'src/common/utils/date.util';

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
          id: createPedidoDto.idCliente,
        },
      });
      if (!customer) {
        throw new HttpException('Cliente não existe', HttpStatus.NOT_FOUND);
      }

      // Valida se existe os produtos estão cadastrados
      await this.validateOrderProducts(createPedidoDto.itensPedido);

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
          id_empresa: createPedidoDto.id_empresa,
          nomeCliente: createPedidoDto.nomeCliente,
          observacao: createPedidoDto.observacao,
          status: createPedidoDto.status,
          localConsumo: createPedidoDto.localConsumo,
          valorSubTotal: createPedidoDto.valorSubTotal,
          valorTotal: createPedidoDto.valorTotal,
          valorTaxaDeEntrega: createPedidoDto.valorTaxaDeEntrega,

          dh_criacao: getLocalDate(),
          dh_alteracao: getLocalDate(),
          // Produtos do pedido
          itensPedido: {
            create: createPedidoDto.itensPedido.map((produto) => ({
              id_produto: produto.idProduto,
              quantidade: produto.quantidade,
              precoUnitario: produto.precoUnitario,
              observacaoItem: produto.observacaoItem,
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

      // Realiza impressão do pedido
      //const print = await this.printer.printOrder(order);

      return {
        success: true,
        message: 'Pedido criado com sucesso',
        data: {
          idPedido: order.id,
          nomeCliente: order.nomeCliente,
          valorTotal: order.valorTotal,
        },
      };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao criar o pedido', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async findAll(filters: { status?: string }) {
    return await this.prisma.pedidos.findMany({
      where: {
        ...(filters.status && { status: Number(filters.status) }),
      },
      include: {
        itensPedido: {
          include: {
            produtos: {
              // inclui os dados do produto
              select: {
                nomeProduto: true,
                imagemUrl: true,
              },
            },
            complementosItem: {
              include: {
                complementos: {
                  select: {
                    idGrupoComplementos: true,
                    nomeComplemento: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.pedidos.findUnique({
        where: {
          id: id,
        },
        include: {
          itensPedido: {
            include: {
              produtos: {
                // inclui os dados do produto
                select: {
                  nomeProduto: true,
                },
              },
              complementosItem: {
                include: {
                  complementos: {
                    select: {
                      nomeComplemento: true,
                    },
                  },
                },
              },
            },
          },
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
        throw new HttpException('O Pedido não foi encontrado.', HttpStatus.NOT_FOUND);
      }

      if (findOrder.status !== 1) {
        throw new HttpException('Pedido com esse status não pode ser alterado.', HttpStatus.UNAUTHORIZED);
      }

      await this.validateOrderProducts(updatePedidoDto.itensPedido);

      const updateOrder = this.prisma.$transaction(async (tx) => {
        // Deletar todos itens do pedido
        await tx.pedidoProdutos.deleteMany({
          where: {
            id_pedido: id,
          },
        });

        // Verificar se 'itensPedidoVenda' foi fornecido
        const itens = updatePedidoDto.itensPedido || []; // Valor padrão vazio caso não tenha sido enviado

        return await tx.pedidos.update({
          where: {
            id: id,
          },
          data: {
            idCliente: updatePedidoDto.idCliente,
            id_empresa: updatePedidoDto.id_empresa,
            nomeCliente: updatePedidoDto.nomeCliente,
            observacao: updatePedidoDto.observacao,
            valorSubTotal: updatePedidoDto.valorSubTotal,
            valorTotal: updatePedidoDto.valorTotal,
            valorTaxaDeEntrega: updatePedidoDto.valorTaxaDeEntrega,
            localConsumo: updatePedidoDto.localConsumo,
            dh_alteracao: getLocalDate(),

            itensPedido: {
              create: itens.map((item) => ({
                id_produto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                observacaoItem: item.observacaoItem,
                complementosItem: item.complementos?.length
                  ? // Caso houver complementos nos produtos, insere
                    {
                      create: item.complementos.map((complemento) => ({
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
            itensPedido: true,
          },
        });
      });

      return {
        success: true,
        message: 'Pedido alterado com sucesso',
        data: {
          idPedido: (await updateOrder).id,
          nomeCliente: (await updateOrder).nomeCliente,
          valorTotal: (await updateOrder).valorTotal,
        },
      };
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
        throw new HttpException(`O Pedido ${id} não foi encontrado`, HttpStatus.NOT_FOUND);
      }

      if (findOrder.status !== 1) {
        throw new HttpException('Pedido com esse status não pode ser deletado.', HttpStatus.UNAUTHORIZED);
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

  async updateKitchenOrderStatus(id: number, status: number, payloadParam: JwtPayload) {
    try {
      const findOrder = await this.prisma.pedidos.findUnique({
        where: {
          id: id,
        },
      });

      if (!findOrder) {
        throw new HttpException('O Pedido não foi encontrado.', HttpStatus.NOT_FOUND);
      }

      const updateOrder = await this.prisma.pedidos.update({
        where: {
          id: id,
        },
        data: {
          status,
          dh_alteracao: getLocalDate(),
        },
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

  private async validateOrderProducts(itensPedido: { idProduto: number }[]) {
    if (!itensPedido || itensPedido.length === 0) return;

    const idsProduct = itensPedido.map((item) => item.idProduto);

    const existingProducts = await this.prisma.produtos.findMany({
      where: {
        id: { in: idsProduct },
      },
      select: { id: true },
    });

    const idsExistingProducts = existingProducts.map((produto) => produto.id);

    const productsNotFound = idsProduct.filter((id) => !idsExistingProducts.includes(id));

    if (productsNotFound.length > 0) {
      throw new HttpException(`Os seguintes produtos não foram encontrados: ${productsNotFound.join(', ')}`, HttpStatus.BAD_REQUEST);
    }
  }
}
