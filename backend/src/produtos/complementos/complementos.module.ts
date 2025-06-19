import { Module } from '@nestjs/common';
import { ComplementosService } from './complementos.service';
import { ComplementosController } from './complementos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComplementosController],
  providers: [ComplementosService],
})
export class ComplementosModule {}
