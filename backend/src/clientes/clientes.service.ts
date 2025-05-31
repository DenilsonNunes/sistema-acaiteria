import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const customer = await this.prisma.clientes.create({
        data: {
          nome: createClienteDto.nome,
          apelido: createClienteDto.apelido,
          endereco: createClienteDto.endereco,
          fone: createClienteDto.fone,
          status: createClienteDto.status,
        },
        select: {
          id: true,
          nome: true,
          apelido: true,
          status: true,
        },
      });

      return customer;
    } catch (err) {
      console.log(err);
      throw new HttpException('Houve um erro ao cadastrar o cliente', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.clientes.findMany();
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
          data_alteracao: new Date(),
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

      await this.prisma.clientes.delete({
        where: {
          id: id,
        },
      });

      return { message: 'Cliente deletado com sucesso.' };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao deletar o cliente', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }
}
