import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentTefDto {
  @IsString({ message: 'A chave do cliente deve ser uma string' })
  @IsNotEmpty({ message: 'A chave do cliente é obrigatório' })
  cliente_chave: string;

  @IsNotEmpty({ message: 'O ID da POS é obrigatório' })
  @IsNumber({}, { message: 'O ID da POS deve ser um número' })
  pos_id: number;

  @IsString({ message: 'O tipo da transação deve ser uma string' })
  @IsNotEmpty({ message: 'O tipo da transação é obrigatório' })
  @IsIn(['1', '2', '3'], {
    // 1 Debito - 2 Credito - 3 Pix
    message: 'O tipo data transação deve ser 1 - Debito, 2 - Credito ou 3 - Pix',
  })
  transaction_type: string;

  // Numero de parcelas
  @IsNumber({}, { message: 'O Número de parcelas deve ser um número' })
  @IsNotEmpty({ message: 'O Número de parcelas é obrigatório' })
  installment_count: number;

  // Tipo de parcelamento
  @IsNumber({}, { message: 'O tipo de parcelamento deve ser um número' })
  @IsNotEmpty({ message: 'O tipo de parcelamento é obrigatório' })
  installment_type: number;

  // Valor da cobrança
  @IsNumber({}, { message: 'O valor da cobrança deve ser um número' })
  @IsNotEmpty({ message: 'O valor da cobrança é obrigatório' })
  amount: number;

  // ID do pedido - opcional
  @IsOptional()
  @IsString({ message: 'O ID do pedido deve ser uma string' })
  order_id?: string;

  // Descrição - opcional
  @IsOptional()
  @IsString({ message: 'A descrição do pagamento deve ser uma string' })
  description?: string;
}
