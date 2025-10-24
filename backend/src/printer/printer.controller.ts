import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post('print-order/:id')
  async printOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.printerService.testConnection();
  }

  @Get('test-connection')
  async testConnection() {
    return await this.printerService.testConnection();
  }

  @Get('test-print')
  async testPrint() {
    return await this.printerService.printTest();
  }
}
