import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComplementoDto } from './dto/create-complemento.dto';
import { UpdateComplementoDto } from './dto/update-complemento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplementosService {
  constructor(private prisma: PrismaService) {}

  async create(createComplementoDto: CreateComplementoDto) {
    try {
      const findAddOnGroup = await this.prisma.grupoComplementos.findUnique({
        where: {
          id: createComplementoDto.idGrupoComplementos,
        },
      });

      // Se não encontrar, retorna mensagem para o usuário
      if (!findAddOnGroup) {
        throw new HttpException(`Falha ao criar complemento. O Grupo de complementos ${createComplementoDto.idGrupoComplementos} não existe.`, HttpStatus.NOT_FOUND);
      }

      return await this.prisma.complementos.create({
        data: createComplementoDto,
      });
    } catch (err) {
      console.log('Error', err);
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao criar grupo de complementos', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.complementos.findMany({});
  }

  //Busca somente por um ID
  async findOne(id: number) {
    const complement = await this.prisma.complementos.findUnique({
      where: {
        id: id,
      },
    });

    if (complement) return complement;
    // Caso não encontre o produto
    throw new HttpException('Complemento não encontrado!', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateComplementoDto: UpdateComplementoDto) {
    try {
      // Busca o complemento pelo ID
      const findComplement = await this.prisma.complementos.findUnique({
        where: {
          id: id,
        },
      });
      // Se não encontrar, retorna mensagem para o usuário
      if (!findComplement) {
        throw new HttpException('O Complemento não foi encontrado.', HttpStatus.NOT_FOUND);
      }

      // Verifica se existe o grupo de complemento
      const findAddOnGroup = await this.prisma.grupoComplementos.findUnique({
        where: {
          id: updateComplementoDto.idGrupoComplementos,
        },
      });

      // Se não encontrar, retorna mensagem para o usuário
      if (!findAddOnGroup) {
        throw new HttpException(`Falha ao atualizar o complemento. O Grupo de complementos ${updateComplementoDto.idGrupoComplementos} não existe.`, HttpStatus.NOT_FOUND);
      }

      // Se encontrou, atualiza o complemento.
      const complement = await this.prisma.complementos.update({
        where: {
          id: id,
        },
        data: {
          nomeComplemento: (updateComplementoDto?.nomeComplemento as string) ?? findComplement.nomeComplemento,
          descricao: updateComplementoDto?.descricao ? updateComplementoDto?.descricao : findComplement.descricao,
          preco: updateComplementoDto?.preco ? updateComplementoDto?.preco : findComplement.preco,
          status: updateComplementoDto.status !== undefined ? updateComplementoDto.status : findComplement.status,
          idGrupoComplementos: updateComplementoDto.idGrupoComplementos ? updateComplementoDto.idGrupoComplementos : findComplement.idGrupoComplementos,
          data_alteracao: new Date(),
        },
      });

      // Retorna o complemento depois de atualizar
      return complement;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao atualizar o complemento.', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      // Busca o complemento pelo ID
      const findComplement = await this.prisma.complementos.findUnique({
        where: {
          id: id,
        },
      });
      // Se não encontrar, retorna mensagem para o usuário
      if (!findComplement) {
        throw new HttpException('O Complemento não foi encontrado.', HttpStatus.NOT_FOUND);
      }

      // Deleta o produto
      await this.prisma.complementos.delete({
        where: {
          id: id,
        },
      });

      return { message: 'Complemento deletado com sucesso.' };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao deletar o complemento', HttpStatus.BAD_REQUEST);
    }
  }
}
