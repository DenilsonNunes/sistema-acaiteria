import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const PayloadParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const context = ctx.switchToHttp();
  const request: Request = context.getRequest();

  return request['token_payload'] as JwtPayload;
});
