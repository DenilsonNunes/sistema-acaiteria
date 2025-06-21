import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  nome: string;

  @IsString({ message: 'O usuário deve ser uma string.' })
  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
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
