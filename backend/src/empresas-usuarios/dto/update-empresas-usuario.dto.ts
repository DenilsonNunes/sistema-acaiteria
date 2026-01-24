import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaUsuarioDto } from './create-empresas-usuario.dto';

export class UpdateEmpresasUsuarioDto extends PartialType(CreateEmpresaUsuarioDto) {}
