import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpClient } from '../http/http-client';
import { CreatePaymentTefDto } from 'src/tef/dto/create-payment-tef.dto';

@Injectable()
export class SuperTefService {
  private readonly baseURrl = 'https://api.supertef.com.br/api';

  async createPayment(createPaymentTefDto: CreatePaymentTefDto) {
    try {
      const data = await httpClient.post(`${this.baseURrl}/pagamentos`, createPaymentTefDto, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN_SUPERTEF}`,
        },
      });

      return data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Erro ao comunicar com SuperTef', error.response?.status || HttpStatus.BAD_GATEWAY);
    }
  }
}
