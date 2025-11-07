import { Injectable } from '@nestjs/common';
import { CreatePaymentTefDto } from './dto/create-payment-tef.dto';
import { SuperTefService } from 'src/integrations/superTef/superTef.service';

@Injectable()
export class TefService {
  constructor(private readonly superTef: SuperTefService) {}

  async createPayment(createPaymentTefDto: CreatePaymentTefDto) {
    const response = await this.superTef.createPayment(createPaymentTefDto);

    return response;
  }

  findOne(id: number) {
    return `Encontrou o pagamento#${id} tef`;
  }

  cancelPayment(id: number) {
    return `This action removes a #${id} tef`;
  }
}
