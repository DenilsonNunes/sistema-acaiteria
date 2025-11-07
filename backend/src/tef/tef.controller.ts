import { Controller, Get, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { TefService } from './tef.service';
import { CreatePaymentTefDto } from './dto/create-payment-tef.dto';

@Controller('tef')
export class TefController {
  constructor(private readonly tefService: TefService) {}

  @Post('payments')
  createPayment(@Body() createTefDto: CreatePaymentTefDto) {
    return this.tefService.createPayment(createTefDto);
  }

  @Get('payments/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tefService.findOne(id);
  }

  @Put('payments/cancel/:id')
  cancelPayment(@Param('id', ParseIntPipe) id: number) {
    return this.tefService.cancelPayment(id);
  }
}
