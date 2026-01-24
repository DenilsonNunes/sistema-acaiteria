import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString({ message: 'O cpf/cnpj deve ser uma string' })
  @IsNotEmpty({ message: 'O cpf/cnpj é obrigatório' })
  cpf_cnpj: string;

  @IsString({ message: 'O nome da empresa deve ser uma string' })
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório' })
  xNome: string;

  @IsString({ message: 'O nome fantasia deve ser uma string' })
  @IsOptional()
  xFant?: string;

  @IsString({ message: 'O logradouro deve ser uma string' })
  @IsOptional()
  xLgr?: string;

  @IsString({ message: 'O numero do endereço deve ser uma string' })
  @IsOptional()
  numero?: string;

  @IsString({ message: 'O complemento do endereço deve ser uma string' })
  @IsOptional()
  xCpl?: string;

  @IsString({ message: 'O fone deve ser uma string' })
  @IsOptional()
  fone?: string;

  @IsBoolean({ message: 'O status deve ser um boolean' })
  @IsOptional()
  status?: boolean;
}
