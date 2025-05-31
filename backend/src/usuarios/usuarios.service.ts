import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      // Verifica se o usuário contém Espaços
      if (createUsuarioDto.usuario.includes(' ')) {
        throw new HttpException('O usuário não pode conter espaços!', HttpStatus.BAD_REQUEST);
      }

      const senhaHash = await this.hashingService.hash(createUsuarioDto.senha);

      const user = await this.prisma.usuarios.create({
        data: {
          nome: createUsuarioDto.nome,
          usuario: createUsuarioDto.usuario,
          email: createUsuarioDto.email,
          senha: senhaHash,
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
      // Verificar se veio vazio
      if (!updateUsuarioDto || Object.keys(updateUsuarioDto).length === 0) {
        throw new HttpException('Nenhuma informação foi fornecida para atualizar.', HttpStatus.BAD_REQUEST);
      }
      // Verifica se existe um usuário com ID informado
      const user = await this.prisma.usuarios.findUnique({
        where: {
          id: id,
        },
      });
      // Se não encontrar o usuário para renomear, retorna uma mensagem
      if (!user) {
        throw new HttpException('Usuário não existe.', HttpStatus.NOT_FOUND);
      }

      // Se informou usuário
      if (updateUsuarioDto.usuario) {
        // Verificar se já existe algum usuári ocom mesmo nome
        const userWithSameName = await this.prisma.usuarios.findFirst({
          where: {
            usuario: updateUsuarioDto.usuario,
            id: {
              not: id,
            },
          },
        });
        // Se existir, retorna a mensagem de erro.
        if (userWithSameName) {
          throw new HttpException('Já existe um usuário com esse nome. Tente um nome de usuário diferente.', HttpStatus.BAD_REQUEST);
        }
      }

      // Objeto de atualização
      const dataUserUpdate: UpdateUsuarioDto = {
        nome: updateUsuarioDto.nome ?? user.nome,
        usuario: updateUsuarioDto.usuario ?? user.usuario,
        email: updateUsuarioDto.email ?? user.email,
        status: updateUsuarioDto.status ?? user.status,
        data_alteracao: new Date(),
      };

      // Se tiver senha, gerar o hash e adicionar ao objeto
      if (updateUsuarioDto.senha) {
        dataUserUpdate.senha = await this.hashingService.hash(updateUsuarioDto.senha);
      }

      // Atualizar o usuário
      const updateUser = await this.prisma.usuarios.update({
        where: { id },
        data: dataUserUpdate,
      });

      return updateUser;
    } catch (err) {
      // Verifica se o erro é uma HttpException
      if (err instanceof HttpException) {
        throw err; // Propaga a HttpException original
      }
      throw new HttpException('Erro ao alterar usuário', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async remove(id: number) {
    try {
      const findUser = await this.prisma.usuarios.findUnique({
        where: {
          id: id,
        },
      });

      // Se não encontrar o usuário para deletar, retorna uma mensagem
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
