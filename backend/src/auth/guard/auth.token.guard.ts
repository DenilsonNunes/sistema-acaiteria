import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = await context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    const method = request.method;
    const path = request.path;

    // Ignora a rota de login (POST /auth/login)
    if (method === 'POST' && path === '/auth/login') {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.jwtConfiguration);
      request['token_payload'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Token não encontrado', { cause: err });
    }

    return true;
  }

  extractTokenHeader(request: Request) {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
