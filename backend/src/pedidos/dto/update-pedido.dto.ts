import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto, ItensPedido } from './create-pedido.dto';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
  @IsArray()
  @ArrayNotEmpty({ message: 'É preciso enviar ao menos um item para atualizar o pedido.' })
  @ValidateNested({ each: true })
  @Type(() => ItensPedido)
  itensPedido: ItensPedido[];
}
