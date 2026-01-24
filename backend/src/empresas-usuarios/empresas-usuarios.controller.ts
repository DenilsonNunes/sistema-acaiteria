import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresasUsuariosService } from './empresas-usuarios.service';
import { CreateEmpresaUsuarioDto } from './dto/create-empresas-usuario.dto';
import { UpdateEmpresasUsuarioDto } from './dto/update-empresas-usuario.dto';

@Controller('empresas')
export class EmpresasUsuariosController {
  constructor(private readonly empresasUsuariosService: EmpresasUsuariosService) {}

  @Post(':idEmpresa/usuarios')
  create(@Body() CreateEmpresaUsuarioDto: CreateEmpresaUsuarioDto) {
    return this.empresasUsuariosService.create(CreateEmpresaUsuarioDto);
  }

  @Get()
  findAll() {
    return this.empresasUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasUsuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresasUsuarioDto: UpdateEmpresasUsuarioDto) {
    return this.empresasUsuariosService.update(+id, updateEmpresasUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasUsuariosService.remove(+id);
  }
}
