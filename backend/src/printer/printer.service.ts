import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodeThermalPrinter from 'node-thermal-printer'; // Importa o módulo inteiro

// Tipos exportados pelo pacote (baseados na doc)
type PrinterTypes = typeof nodeThermalPrinter.types; // Para inferir os tipos disponíveis
type ThermalPrinter = InstanceType<typeof nodeThermalPrinter.printer>;

@Injectable()
export class PrinterService {
  private printer: ThermalPrinter; // Agora com tipo inferido

  constructor() {
    // Inicialize a impressora (ajuste conforme seu modelo e interface)
    this.printer = new nodeThermalPrinter.printer({
      type: nodeThermalPrinter.types.EPSON, // Ou STAR, etc. (use nodeThermalPrinter.types)
      interface: '/dev/usb/lp0', // Exemplo para USB no Linux; use 'tcp://IP:PORTA' para rede
      width: 48, // Largura da linha em caracteres
    });
  }

  async printOrder(Order) {
    try {
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new HttpException('Impressora não conectada', HttpStatus.BAD_REQUEST);
      }

      this.printer.alignCenter();
      this.printer.println('=== TESTE DE IMPRESSÃO ===');
      this.printer.drawLine();
      this.printer.alignLeft();
      this.printer.println('Fim do teste.');
      this.printer.cut(); // Corta o papel

      await this.printer.execute();
    } catch (err) {
      throw new HttpException('Falha ao realizar a impressão do pedido', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async printTest(): Promise<void> {
    try {
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new Error('Impressora não conectada');
      }

      this.printer.alignCenter();
      this.printer.println('=== TESTE DE IMPRESSÃO ===');
      this.printer.drawLine();
      this.printer.alignLeft();
      this.printer.println('Fim do teste.');
      this.printer.cut(); // Corta o papel

      await this.printer.execute();
    } catch (err) {
      throw new HttpException('Falha ao realizar teste de impressão', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const isConnected = await this.printer.isPrinterConnected();
      return isConnected;
    } catch (err) {
      throw new HttpException('Falha ao realizar teste de conexão com a impressora', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
}
