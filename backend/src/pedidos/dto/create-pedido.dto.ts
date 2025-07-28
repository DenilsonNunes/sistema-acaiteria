import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, ValidateNested } from 'class-validator';

class ComplementosProdutoPedido {
  @IsNumber({}, { message: 'O código do complemento deve ser um numero' })
  idComplemento: number;

  @IsNumber({}, { message: 'O código do complemento deve ser um numero' })
  idProdutoPedido: number;

  @IsNumber({}, { message: 'A quantidade informada deve ser um numero' })
  quantidade: number;

  @IsNumber()
  precoUnitario: number;
}

class ItensPedidoVenda {
  @IsNumber({}, { message: 'O código do produto deve ser um numero' })
  idProduto: number;

  @IsNumber({}, { message: 'A quantidade informada deve ser um numero' })
  quantidade: number;

  @IsNumber()
  precoUnitario: number;

  //@IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComplementosProdutoPedido)
  complementos?: ComplementosProdutoPedido[];
}

export class CreatePedidoDto {
  @IsNumber({}, { message: 'O código do cliente deve ser um numero' })
  idCliente: number;

  observacao?: string; // Opcional

  @IsNumber()
  valorTotal: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'É preciso enviar ao menos um item para criar o pedido.' })
  @ValidateNested({ each: true })
  @Type(() => ItensPedidoVenda) // Garantido que o tipo seja dos itens
  itensPedidoVenda: ItensPedidoVenda[];
}
