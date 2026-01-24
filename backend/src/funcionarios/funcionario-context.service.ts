/*
    
    import { Injectable, Scope, Inject } from '@nestjs/common';
    import { REQUEST } from '@nestjs/core';
    import { Request } from 'express';
    import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
    
    export interface FuncionarioContext {
      id: number;
      id_empresa: number;
      cod_empresa: number;
    }
    
    @Injectable({ scope: Scope.REQUEST })
    export class FuncionarioContextService {
      constructor(@Inject(REQUEST) private readonly request: Request) {}
    
      get(): FuncionarioContext {
        const payload = this.request['token_payload'] as JwtPayload;
    
    
    
        return {
          id: payload.id,
          id_empresa: payload.id_empresa,
          cod_empresa: payload.cod_empresa,
        };
      }
    }
    






    */
