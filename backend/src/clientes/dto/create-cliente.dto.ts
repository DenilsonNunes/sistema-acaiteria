import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsString()
  @IsOptional()
  apelido?: string;

  @IsString()
  endereco: string;

  @Transform(({ value }: { value: string | null | undefined }) => (value === '' || value === undefined ? null : value))
  @IsString()
  @IsOptional()
  @Length(8, 15, { message: 'O fone deve conter entre 8 e 15 números.' })
  fone: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @Type(() => Number)
  @IsNumber({}, { message: 'O limite de crédito deve ser um número.' })
  @Min(0, { message: 'O limite de crédito deve ser maior ou igual a 0.' })
  limiteCredito: number;

  @Transform(({ value }: { value: string | null | undefined }) => (value === '' || value === undefined ? null : value))
  @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida (YYYY-MM-DD)' })
  @IsOptional()
  data_nascimento: string;
}
