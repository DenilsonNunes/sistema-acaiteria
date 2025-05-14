import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      // Verifica se existe o usuário
      const user = await this.prisma.usuarios.findUnique({
        where: {
          id: createPedidoDto.idUsuario,
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

      // Obtem os Ids dos produtos que veio na requisição
      const idsProduct = createPedidoDto.itensPedidoVenda.map((item) => item.idProduto);

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

      const order = await this.prisma.pedidos.create({
        data: {
          idCliente: createPedidoDto.idCliente,
          idUsuario: createPedidoDto.idUsuario,
          observacao: createPedidoDto.observacao,
          valorTotal: createPedidoDto.valorTotal,
          itensPedidoVenda: {
            create: createPedidoDto.itensPedidoVenda.map((item) => ({
              idProduto: item.idProduto,
              quantidade: item.quantidade,
              precoUnitario: item.precoUnitario,
            })),
          },
        },
        include: {
          itensPedidoVenda: true,
        },
      });

      return order;
    } catch (err) {
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

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
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
        await tx.itensPedido.deleteMany({
          where: {
            idPedido: id,
          },
        });

        // Verificar se 'itensPedidoVenda' foi fornecido
        const itens = updatePedidoDto.itensPedidoVenda || []; // Valor padrão vazio caso não tenha sido enviado

        return await tx.pedidos.update({
          where: {
            id: id,
          },
          data: {
            idCliente: updatePedidoDto.idCliente,
            idUsuario: updatePedidoDto.idUsuario,
            observacao: updatePedidoDto.observacao,
            valorTotal: updatePedidoDto.valorTotal,
            data_alteracao: new Date(),
            itensPedidoVenda: {
              create: itens.map((item) => ({
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
              })),
            },
          },
          include: {
            itensPedidoVenda: true,
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
