import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      // Verifica se o usuário contém Espaços
      if (createUsuarioDto.usuario.includes(' ')) {
        throw new HttpException('O usuário não pode conter espaços!', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.usuarios.create({
        data: {
          nome: createUsuarioDto.nome,
          usuario: createUsuarioDto.usuario,
          email: createUsuarioDto.email,
          senha: createUsuarioDto.senha,
          status: createUsuarioDto.status,
        },
        select: {
          id: true,
          nome: true,
          usuario: true,
          email: true,
        },
      });

      return user;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao criar usuário', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async findAll() {
    return await this.prisma.usuarios.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.usuarios.findUnique({
      where: {
        id: id,
      },
    });

    if (user) return user;

    throw new HttpException('Nenhum usuário foi encontrado', HttpStatus.BAD_REQUEST);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const findUser = await this.prisma.usuarios.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar o usuário para renomear, retorna uma mensagem
      if (!findUser) {
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
      }

      // Atualiza usuário
      const user = await this.prisma.usuarios.update({
        where: {
          id: id,
        },
        data: {
          nome: updateUsuarioDto?.nome ? updateUsuarioDto.nome : findUser.nome,
          usuario: updateUsuarioDto?.usuario ? updateUsuarioDto.usuario : findUser.usuario,
          email: updateUsuarioDto?.email ? updateUsuarioDto.email : findUser.email,
          senha: updateUsuarioDto?.senha ? updateUsuarioDto.senha : findUser.senha,
          status: updateUsuarioDto?.status !== undefined ? updateUsuarioDto.status : findUser.status,
          data_alteracao: new Date(),
        },
      });
      return user;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao alterar usuários', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      const findUser = await this.prisma.usuarios.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar o usuário para renomear, retorna uma mensagem
      if (!findUser) {
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
      }

      await this.prisma.usuarios.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Usuário deletado com sucesso!',
      };
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao deletar usuário', HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
    }
  }
}
