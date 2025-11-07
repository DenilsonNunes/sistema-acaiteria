import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTefDto } from './create-payment-tef.dto';

export class UpdateTefDto extends PartialType(CreatePaymentTefDto) {}
