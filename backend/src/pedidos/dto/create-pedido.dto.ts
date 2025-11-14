import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class ComplementosProdutoPedido {
  @IsNumber({}, { message: 'O código do complemento deve ser um numero' })
  idComplemento: number;

  @IsNumber({}, { message: 'A quantidade informada deve ser um numero' })
  quantidade: number;

  @IsNumber()
  precoUnitario: number;
}

export class ItensPedido {
  @IsNumber({}, { message: 'O código do produto deve ser um numero' })
  idProduto: number;

  @IsNumber({}, { message: 'A quantidade informada deve ser um numero' })
  quantidade: number;

  @IsString()
  observacaoItem?: string;

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

  @IsString({ message: 'O nome do cliente é obrigatório' })
  nomeCliente: string;

  @IsString()
  observacao?: string; // Opcional

  @IsNumber()
  valorSubTotal: number;

  @IsNumber()
  valorTotal: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'O valor da taxa de entrega deve ser um número' })
  valorTaxaDeEntrega?: number;

  @IsNumber({}, { message: 'O status do pedido deve ser um numero' })
  status: number;

  @IsNumber({}, { message: 'O código do local de consumo deve ser um numero' })
  localConsumo: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'É preciso enviar ao menos um item para criar o pedido.' })
  @ValidateNested({ each: true })
  @Type(() => ItensPedido) // Garantido que o tipo seja dos itens
  itensPedido: ItensPedido[];
}
