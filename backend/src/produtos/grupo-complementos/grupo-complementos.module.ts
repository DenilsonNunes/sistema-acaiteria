import { Module } from '@nestjs/common';
import { GrupoComplementosService } from './grupo-complementos.service';
import { GrupoComplementosController } from './grupo-complementos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GrupoComplementosController],
  providers: [GrupoComplementosService],
})
export class GrupoComplementosModule {}
