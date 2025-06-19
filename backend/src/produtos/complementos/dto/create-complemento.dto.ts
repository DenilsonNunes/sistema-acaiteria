import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateComplementoDto {
  @IsOptional({})
  @IsNumber({}, { message: 'O ID do grupo de complementos deve ser um numero.' })
  idGrupoComplementos?: number;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'O nome do complemento deve ser uma string.' })
  @MinLength(1, { message: 'O nome do complemento deve conter pelo menos 1 caracter.' })
  @MaxLength(80, { message: 'O nome do complemento não deve ultrapassar 80 caracteres.' })
  nomeComplemento: string;

  @IsOptional({})
  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'A descrição deve ser uma string.' })
  @MaxLength(200, { message: 'A descrição não deve ultrapassar 200 caracteres.' })
  descricao?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @Min(0, { message: 'O preço não pode ser menor que 0.' })
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
