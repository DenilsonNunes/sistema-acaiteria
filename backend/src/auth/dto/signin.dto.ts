import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsString({ message: 'O email deve ser uma string.' })
  @IsEmail({}, { message: 'É necessário informar um email válido!' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  password: string;
}
