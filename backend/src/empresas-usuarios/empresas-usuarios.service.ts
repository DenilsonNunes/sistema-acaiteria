import { Injectable } from '@nestjs/common';
import { CreateEmpresaUsuarioDto } from './dto/create-empresas-usuario.dto';
import { UpdateEmpresasUsuarioDto } from './dto/update-empresas-usuario.dto';

@Injectable()
export class EmpresasUsuariosService {
  create(CreateEmpresaUsuarioDto: CreateEmpresaUsuarioDto) {
    return 'This action adds a new empresasUsuario';
  }

  findAll() {
    return `This action returns all empresasUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresasUsuario`;
  }

  update(id: number, updateEmpresasUsuarioDto: UpdateEmpresasUsuarioDto) {
    return `This action updates a #${id} empresasUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresasUsuario`;
  }
}
