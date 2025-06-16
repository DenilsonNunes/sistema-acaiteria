import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProdutoDto {
  @IsOptional()
  @Type(() => Number)
  idCategoria?: number;

  @IsOptional()
  @Type(() => Number)
  idGrupoComplementos?: number;

  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @MinLength(1, { message: 'O nome do produto deve conter pelo menos 1 caracter.' })
  @MaxLength(80, { message: 'O nome do produto não deve ultrapassar 80 caracteres.' })
  nomeProduto: string;

  @IsString({ message: 'A descricação deve ser uma string.' })
  descricao?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @Min(0, { message: 'O valor não pode ser menor que 0.' })
  preco: number;

  @Type(() => Boolean)
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  imagemUrl?: string;

  @IsOptional()
  data_criacao?: Date;

  @IsOptional()
  data_alteracao?: Date;
}

/*

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


*/
