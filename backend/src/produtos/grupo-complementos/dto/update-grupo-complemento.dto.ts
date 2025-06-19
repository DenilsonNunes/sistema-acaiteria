import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoComplementoDto } from './create-grupo-complemento.dto';

export class UpdateGrupoComplementoDto extends PartialType(CreateGrupoComplementoDto) {}
