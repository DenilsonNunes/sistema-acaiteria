import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({ message: 'A decrição deve ser um texto.' })
  @MinLength(1, { message: 'A descrição deve conter pelo menos 1 caracter.' })
  descricao: string;
}
