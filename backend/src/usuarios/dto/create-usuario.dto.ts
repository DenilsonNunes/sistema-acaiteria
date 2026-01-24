import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : ''))
  nome: string;

  @MinLength(6, { message: 'A senha deve conte no minimo 6 caracteres' })
  senha: string;

  @IsEmail({}, { message: 'É necessário informar um email válido!' })
  email: string;

  @IsBoolean()
  status: boolean;
}
