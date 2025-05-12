import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  nome: string;

  @IsString()
  @MaxLength(10, { message: 'O usuário deve conter no máximo 10 caracteres' })
  usuario: string;

  @MinLength(6, { message: 'A senha deve conte no minimo 6 caracteres' })
  senha: string;

  @IsEmail({}, { message: 'É necessário informar um email válido!' })
  email: string;

  @IsBoolean()
  status: boolean;

  data_criacao: Date;
  data_alteracao: Date;
}
