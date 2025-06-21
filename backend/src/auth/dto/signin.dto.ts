import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @Transform(({ value }: { value: unknown }): string => (typeof value === 'string' ? value.trim() : ''))
  @IsNotEmpty({ message: 'O usuário não pode ser vazio.' })
  @IsString({ message: 'O usuário deve ser uma string.' })
  user: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  password: string;
}
