import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    // Verificar se usuário existe e esta ativo
    const user = await this.prisma.usuarios.findUnique({
      where: {
        usuario: signInDTO.usuario,
      },
    });

    if (!user) {
      throw new HttpException('Falha ao fazer o login', HttpStatus.UNAUTHORIZED);
    }

    // Verificar se a senha e valida
    const passwordIsValid = await this.hashingService.compare(signInDTO.senha, user.senha);

    // Se não for válida, retorna mensagem
    if (!passwordIsValid) {
      throw new HttpException('Senha/Usuário incorretos', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.jwtService.signAsync(
      {
        user: user.id,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );

    return {
      id: user.id,
      usuario: user.usuario,
      token: token,
    };
  }
}
