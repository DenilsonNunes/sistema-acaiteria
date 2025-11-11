import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxasDeEntregaDto } from './create-taxas-de-entrega.dto';

export class UpdateTaxasDeEntregaDto extends PartialType(CreateTaxasDeEntregaDto) {}
