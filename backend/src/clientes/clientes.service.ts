import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getLocalDate } from 'src/common/utils/date.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      await this.prisma.clientes.create({
        data: {
          nome: createClienteDto.nome,
          id_usuario_criador: 1,
          id_empresa: 1,
          apelido: createClienteDto.apelido,
          endereco: createClienteDto.endereco,
          fone: createClienteDto.fone,
          status: createClienteDto.status,
          limite_credito: createClienteDto.limiteCredito,
          data_nascimento: createClienteDto.data_nascimento ? new Date(createClienteDto.data_nascimento) : null,
          dh_criacao: getLocalDate(),
          dh_alteracao: getLocalDate(),
        },
      });

      return {
        success: true,
        message: 'Cliente cadastrado com sucesso',
      };
    } catch (err) {
      console.log('qual o erro', err);
      throw new HttpException('Houve um erro ao cadastrar o cliente', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.prisma.clientes.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        dh_criacao: 'desc',
      },
    });
  }

  async findOne(id: number) {
    try {
      const customer = await this.prisma.clientes.findUnique({
        where: {
          id: id,
        },
      });

      if (customer) return customer;

      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao buscar o cliente', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findByNameOrSurname(query: string) {
    return this.prisma.clientes.findMany({
      where: {
        OR: [
          {
            nome: {
              contains: query,
              mode: 'insensitive', // ignora maiúsculas/minúsculas
            },
          },
          {
            apelido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        status: true, // Somente cliente ativo
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      // Verificar se existe o cliente cadastrado
      const findCustomer = await this.prisma.clientes.findUnique({
        where: {
          id: id,
        },
      });

      if (!findCustomer) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      const updateCustomer = await this.prisma.clientes.update({
        where: {
          id: id,
        },
        data: {
          nome: updateClienteDto?.nome ? updateClienteDto.nome : findCustomer.nome,
          apelido: updateClienteDto?.apelido ? updateClienteDto.apelido : findCustomer.apelido,
          endereco: updateClienteDto?.endereco ? updateClienteDto.endereco : findCustomer.endereco,
          fone: updateClienteDto?.fone ? updateClienteDto.fone : findCustomer.fone,
          status: updateClienteDto?.status !== undefined ? updateClienteDto.status : findCustomer.status,
          limite_credito: updateClienteDto?.limiteCredito ? updateClienteDto.limiteCredito : findCustomer.limite_credito,
          ...(updateClienteDto.data_nascimento && {
            data_nascimento: new Date(updateClienteDto.data_nascimento),
          }),
          dh_alteracao: new Date(),
        },
      });

      return updateCustomer;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao atualizar os dados do cliente', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      // Verificar se existe o cliente cadastrado
      const findCustomer = await this.prisma.clientes.findUnique({
        where: {
          id: id,
        },
      });

      if (!findCustomer) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      const customerForSales = await this.prisma.pedidos.findMany({
        where: {
          idCliente: findCustomer.id,
        },
      });

      if (customerForSales.length) {
        throw new HttpException(`Não é possível excluir o cliente, pois já existem vendas associadas a ele.`, HttpStatus.CONFLICT);
      }

      await this.prisma.clientes.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        message: 'Cliente deletado com sucesso.',
      };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao deletar o cliente', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }
}
