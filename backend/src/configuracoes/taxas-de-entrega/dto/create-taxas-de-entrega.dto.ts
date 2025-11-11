import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaxasDeEntregaDto {
  @IsString({ message: 'O bairro/região deve ser uma string' })
  @IsNotEmpty({ message: 'O bairro/região é obrigatório' })
  bairroRegiao: string;

  @IsNotEmpty({ message: 'O valor da taxa de entrega é obrigatório' })
  @IsNumber({}, { message: 'O valor da taxa de entrega deve ser um número' })
  valor: number;
}
