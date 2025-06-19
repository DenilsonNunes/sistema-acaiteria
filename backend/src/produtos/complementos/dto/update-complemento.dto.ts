import { PartialType } from '@nestjs/mapped-types';
import { CreateComplementoDto } from './create-complemento.dto';

export class UpdateComplementoDto extends PartialType(CreateComplementoDto) {}
