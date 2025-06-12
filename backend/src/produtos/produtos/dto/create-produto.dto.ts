import { IsBoolean, IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
  idCategoria?: number;

  @IsString({ message: 'A decrição deve ser um texto.' })
  @MinLength(1, { message: 'A descrição deve conter pelo menos 1 caracter.' })
  descricao: string;

  @Min(0, { message: 'O Valor não poder ser menor que 0.' })
  preco: number;

  @IsBoolean()
  status: boolean;

  @IsInt({ message: 'A quantidade de acompanhamentos deve ser um número inteiro.' })
  @Min(0, { message: 'A quantidade de acompanhamentos deve ser no mínimo 0.' })
  @Max(10, { message: 'A quantidade de acompanhamentos deve ser no máximo 10.' })
  qtdAcompanhamentos?: number;

  data_criacao: Date;
  data_alteracao: Date;
}
