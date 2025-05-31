import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsString()
  @IsOptional()
  apelido?: string;

  @IsString()
  endereco: string;

  @IsString()
  @Length(8, 15, { message: 'O fone deve conter entre 8 e 15 números.' })
  fone: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
