import { Module } from '@nestjs/common';
import { EmpresasUsuariosService } from './empresas-usuarios.service';
import { EmpresasUsuariosController } from './empresas-usuarios.controller';

@Module({
  controllers: [EmpresasUsuariosController],
  providers: [EmpresasUsuariosService],
})
export class EmpresasUsuariosModule {}
