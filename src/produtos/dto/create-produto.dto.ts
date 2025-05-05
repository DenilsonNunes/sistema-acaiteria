import { IsBoolean, IsString, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'A decrição deve ser um texto.' })
  @MinLength(1, { message: 'A descrição deve conter pelo menos 1 caracter.' })
  descricao: string;

  @Min(0, { message: 'O Valor não poder ser menor que 0.' })
  preco: number;

  @IsBoolean()
  status: boolean;

  categoriaId?: number;
  data_criacao: Date;
  data_alteracao: Date;
}
