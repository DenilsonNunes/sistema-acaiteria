import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProdutoDto {
  @IsOptional()
  @Type(() => Number)
  id_categoria?: number;

  @IsOptional()
  @Type(() => Number)
  idGrupoComplementos?: number;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @MinLength(1, { message: 'O nome do produto deve conter pelo menos 1 caracter.' })
  @MaxLength(80, { message: 'O nome do produto não deve ultrapassar 80 caracteres.' })
  nomeProduto: string;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'A descricação deve ser uma string.' })
  descricao?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @Min(0, { message: 'O valor não pode ser menor que 0.' })
  preco: number;

  @Transform(({ value }) => value === 'true') // recebo como uma string e converto para boolean
  @IsBoolean()
  status: boolean;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsOptional()
  @IsString()
  imagemUrl?: string;

  @IsOptional()
  data_criacao?: Date;

  @IsOptional()
  data_alteracao?: Date;
}
