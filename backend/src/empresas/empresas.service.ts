import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getLocalDate } from 'src/common/utils/date.util';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto, payloadParam: JwtPayload) {
    // Verifica se ja existe uma empresa criada com o cpf/cnpj
    const findEmpresa = await this.prisma.empresas.findFirst({
      where: {
        cpf_cnpj: createEmpresaDto.cpf_cnpj,
      },
    });

    if (findEmpresa) {
      throw new HttpException('Já existe uma empresa cadastrada com esse cpf/cnpj.', HttpStatus.CONFLICT);
    }

    // Verificar se já existe um grupo de empresas para o usuário
    let grupoEmpresa = await this.prisma.grupoEmpresas.findFirst({
      where: {
        id_usuario_proprietario: payloadParam.user,
      },
    });

    // Se não existir, cria um
    if (!grupoEmpresa) {
      grupoEmpresa = await this.prisma.grupoEmpresas.create({
        data: {
          id_usuario_proprietario: payloadParam.user,
        },
      });
    }

    const codEmpresa = await this.gerarCodigoEmpresa();

    try {
      await this.prisma.empresas.create({
        data: {
          cod_empresa: codEmpresa,
          id_grupo_empresas: grupoEmpresa.id,
          cpf_cnpj: createEmpresaDto.cpf_cnpj,
          xNome: createEmpresaDto.xNome,
          xFant: createEmpresaDto.xFant,
          fone: createEmpresaDto.fone,
          xLgr: createEmpresaDto.xLgr,
          xCpl: createEmpresaDto.xCpl,
          numero: createEmpresaDto.numero,
          status: createEmpresaDto.status,
          dh_criacao: getLocalDate(),
          dh_alteracao: getLocalDate(),
        },
      });

      return {
        success: true,
        message: 'Empresa criada com sucesso',
      };
    } catch (err) {
      console.log('qual o erro', err);
      throw new HttpException('Houve um erro ao criar a empresa', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.empresas.findMany({
      where: {
        id_grupo_empresas: 1,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }

  private async gerarCodigoEmpresa(): Promise<number> {
    const maior = await this.prisma.empresas.aggregate({
      _max: {
        cod_empresa: true,
      },
    });

    const ultimoCodigo = maior._max.cod_empresa ?? 0;

    return ultimoCodigo + 1;
  }
}
