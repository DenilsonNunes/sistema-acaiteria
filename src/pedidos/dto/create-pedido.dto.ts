import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, ValidateNested } from 'class-validator';

class IItensPedidoVenda {
  @IsNumber({}, { message: 'O código do produto deve ser um numero' })
  idProduto: number;

  @IsNumber({}, { message: 'A quantidade informada deve ser um numero' })
  quantidade: number;

  @IsNumber()
  precoUnitario: number;
}

export class CreatePedidoDto {
  @IsNumber({}, { message: 'O código do cliente deve ser um numero' })
  idCliente: number;

  @IsNumber({}, { message: 'O código do usuário deve ser um numero' })
  idUsuario: number;

  observacao?: string; // Opcional

  @IsNumber()
  valorTotal: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'É preciso enviar ao menos um item para criar o pedido.' })
  @ValidateNested({ each: true })
  @Type(() => IItensPedidoVenda) // Garantido que o tipo seja dos itens
  itensPedidoVenda: IItensPedidoVenda[];
}
