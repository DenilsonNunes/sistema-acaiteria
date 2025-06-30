import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGrupoComplementoDto } from './dto/create-grupo-complemento.dto';
import { UpdateGrupoComplementoDto } from './dto/update-grupo-complemento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GrupoComplementosService {
  constructor(private prisma: PrismaService) {}

  async create(createGrupoComplementoDto: CreateGrupoComplementoDto) {
    const { qtdMaxComplemento, qtdMinComplemento } = createGrupoComplementoDto;

    if (qtdMinComplemento > qtdMaxComplemento) {
      throw new BadRequestException('A quantidade mínima de complementos não pode ser maior que a quantidade máxima.');
    }

    const findProduct = await this.prisma.produtos.findUnique({
      where: {
        id: createGrupoComplementoDto.idProduto,
      },
    });

    // Se não encontrar, retorna mensagem para o usuário
    if (!findProduct) {
      throw new HttpException(`Falha ao criar  o grupo de complementos. O produto ${createGrupoComplementoDto.idProduto} não existe.`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.prisma.grupoComplementos.create({
        data: createGrupoComplementoDto,
      });
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao criar grupo de complementos', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.prisma.grupoComplementos.findMany({});
  }

  async findOne(id: number) {
    const addOnGroup = await this.prisma.grupoComplementos.findUnique({
      where: {
        id: id,
      },
    });

    if (addOnGroup) return addOnGroup;
    // Caso não encontre o grupo de complementos
    throw new HttpException('Grupo de complementos não encontrado!', HttpStatus.NOT_FOUND);
  }

  async findAddOnGroupByProductId(id: number) {
    const addOnGroup = await this.prisma.grupoComplementos.findMany({
      where: {
        idProduto: id,
      },
    });

    if (addOnGroup) return addOnGroup;
    // Caso não encontre o grupo de complementos
    throw new HttpException('Grupo de complementos não encontrado!', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateGrupoComplementoDto: UpdateGrupoComplementoDto) {
    try {
      // Busca o grupo de complementos por ID
      const findAddOnGroup = await this.prisma.grupoComplementos.findUnique({
        where: {
          id: id,
        },
      });
      // Se não encontrar, retorna mensagem para o usuário
      if (!findAddOnGroup) {
        throw new HttpException('O Grupo de complementos não foi encontrado.', HttpStatus.NOT_FOUND);
      }
      // Se encontrou, atualiza o produto com as informações que o usuário passou
      const addOnGroup = await this.prisma.grupoComplementos.update({
        where: {
          id: id,
        },
        data: {
          descricao: updateGrupoComplementoDto?.descricao ? updateGrupoComplementoDto?.descricao : findAddOnGroup.descricao,
          qtdMinComplemento: updateGrupoComplementoDto?.qtdMinComplemento ? updateGrupoComplementoDto?.qtdMinComplemento : findAddOnGroup.qtdMinComplemento,
          qtdMaxComplemento: updateGrupoComplementoDto.qtdMaxComplemento !== undefined ? updateGrupoComplementoDto.qtdMaxComplemento : findAddOnGroup.qtdMaxComplemento,
          obrigatorio: updateGrupoComplementoDto.obrigatorio !== undefined ? updateGrupoComplementoDto.obrigatorio : findAddOnGroup.obrigatorio,
          data_alteracao: new Date(),
        },
      });
      // Retorna o grupod e complementos
      return addOnGroup;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao atualizar o grupo de complementos.', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      const findAddOnGroup = await this.prisma.grupoComplementos.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar o grupo de complementos, retorna mensagem
      if (!findAddOnGroup) {
        throw new HttpException('Grupo de complementos não encontrado.', HttpStatus.NOT_FOUND);
      }

      // Deleta o produto
      await this.prisma.grupoComplementos.delete({
        where: {
          id: id,
        },
      });

      return { message: `Grupo de complementos: "${findAddOnGroup.id} - ${findAddOnGroup.descricao}" deletado com sucesso.` };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Falha ao deletar o grupo de complementos', HttpStatus.BAD_REQUEST);
    }
  }
}
