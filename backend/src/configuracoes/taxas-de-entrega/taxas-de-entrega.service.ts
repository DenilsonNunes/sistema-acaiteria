import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaxasDeEntregaDto } from './dto/create-taxas-de-entrega.dto';
import { UpdateTaxasDeEntregaDto } from './dto/update-taxas-de-entrega.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getLocalDate } from 'src/common/utils/date.util';

@Injectable()
export class TaxasDeEntregaService {
  constructor(private prisma: PrismaService) {}

  async create(createTaxasDeEntregaDto: CreateTaxasDeEntregaDto) {
    // Verifica se ja existe uma taxa de entrega com esse nome
    const bairro = createTaxasDeEntregaDto.bairroRegiao.toLowerCase();
    const findTaxaDeEntrega = await this.prisma.taxasDeEntrega.findFirst({
      where: {
        bairroRegiao: bairro,
      },
    });

    if (findTaxaDeEntrega) {
      throw new HttpException('Taxa de entrega já cadastrada para este bairro/região.', HttpStatus.CONFLICT);
    }

    try {
      await this.prisma.taxasDeEntrega.create({
        data: {
          bairroRegiao: createTaxasDeEntregaDto.bairroRegiao,
          valor: createTaxasDeEntregaDto.valor,

          data_criacao: getLocalDate(),
          data_alteracao: getLocalDate(),
        },
      });

      return {
        success: true,
        message: 'Taxa de entrega cadastrado com sucesso',
      };
    } catch (err) {
      console.log('qual o erro', err);
      throw new HttpException('Houve um erro ao cadastrar a taxa de entrega', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.taxasDeEntrega.findMany();
  }
  async findOne(id: number) {
    try {
      const taxaDeEntrega = await this.prisma.taxasDeEntrega.findUnique({
        where: {
          id: id,
        },
      });

      if (taxaDeEntrega) return taxaDeEntrega;

      throw new HttpException('Taxa de entrega não encontrado', HttpStatus.NOT_FOUND);
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao buscar a taxa de entrega', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
  async update(id: number, updateTaxasDeEntregaDto: UpdateTaxasDeEntregaDto) {
    try {
      const findTaxaDeEntrega = await this.prisma.taxasDeEntrega.findUnique({
        where: {
          id: id,
        },
      });

      if (!findTaxaDeEntrega) {
        throw new HttpException('Taxa de entrega não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.taxasDeEntrega.update({
        where: {
          id: id,
        },
        data: {
          bairroRegiao: updateTaxasDeEntregaDto?.bairroRegiao ? updateTaxasDeEntregaDto?.bairroRegiao : findTaxaDeEntrega.bairroRegiao,
          valor: updateTaxasDeEntregaDto?.valor ? updateTaxasDeEntregaDto.valor : findTaxaDeEntrega.valor,
          data_alteracao: getLocalDate(),
        },
      });

      return {
        success: true,
        message: 'Taxa de entrega alterado com sucesso',
      };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao atualizar os dados da taxa de entrega', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      // Verifica se a taxa de entrega existe
      const findTaxaDeEntrega = await this.prisma.taxasDeEntrega.findUnique({
        where: {
          id: id,
        },
      });
      // Se não existir retorna mensagem
      if (!findTaxaDeEntrega) {
        throw new HttpException(`A taxa de entrega não foi encontrado`, HttpStatus.NOT_FOUND);
      }

      //Deleta a taxa de entrega caso exista
      await this.prisma.taxasDeEntrega.delete({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        message: 'Taxa de entrega excluída com sucesso.',
      };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Houve um erro ao deletar a taxa de entrega', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }
}
