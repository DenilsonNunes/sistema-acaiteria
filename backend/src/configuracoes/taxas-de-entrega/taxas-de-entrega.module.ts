import { Module } from '@nestjs/common';
import { TaxasDeEntregaService } from './taxas-de-entrega.service';
import { TaxasDeEntregaController } from './taxas-de-entrega.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaxasDeEntregaController],
  providers: [TaxasDeEntregaService],
})
export class TaxasDeEntregaModule {}
