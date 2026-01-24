// create-empresa-usuario.dto.ts
import { IsInt, IsOptional, IsBoolean, IsDateString, IsString, MaxLength, IsIn, IsNotEmpty } from 'class-validator';

export class CreateEmpresaUsuarioDto {
  @IsNotEmpty({ message: 'O usuário é obrigatório' })
  @IsInt({ message: 'O ID do usuário deve ser um número' })
  id_usuario: number;

  @IsOptional()
  @IsDateString({}, { message: 'A data de admissão deve ser uma data válida (YYYY-MM-DD)' })
  dt_admissao?: Date;

  @IsNotEmpty({ message: 'O perfil é obrigatório' })
  @IsString({ message: 'O perfil deve ser uma string' })
  @MaxLength(11, { message: 'O perfil pode ter no máximo 11 caracteres' })
  @IsIn(['PROPRIETARIO', 'FUNCIONARIO'], {
    message: 'O perfil deve ser PROPRIETARIO ou FUNCIONARIO',
  })
  perfil: string;

  @IsOptional()
  @IsBoolean({ message: 'O status deve ser verdadeiro ou falso' })
  status?: boolean;
}
