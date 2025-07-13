import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateGrupoComplementoDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'O ID do produto deve ser um numero.....' })
  idProduto: number;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'A descrição deve ser uma string.' })
  @MaxLength(40, { message: 'O nome do grupo de complementos não deve ultrapassar 40 caracteres.' })
  nomeGrupoComplementos: string;

  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsOptional()
  @MaxLength(200, { message: 'A descrição não deve ultrapassar 40 caracteres.kkkkkkk' })
  descricao?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'A quantidade minima de complementos deve ser um número.' })
  @Min(0, { message: 'A quantidade minima de complementos não pode ser menor que 0.' })
  qtdMinComplemento: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'A quantidade maxima de complementos deve ser um número.' })
  @Min(0, { message: 'A quantidade maxima de complementos não pode ser menor que 0.' })
  qtdMaxComplemento: number;

  @IsBoolean({ message: 'obrigatorio deve ser um valor booleano' })
  obrigatorio: boolean;

  @IsOptional()
  data_criacao?: Date;

  @IsOptional()
  data_alteracao?: Date;
}
