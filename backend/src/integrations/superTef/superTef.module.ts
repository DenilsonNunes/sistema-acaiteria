import { Module } from '@nestjs/common';
import { SuperTefService } from './superTef.service';

@Module({
  providers: [SuperTefService],
  exports: [SuperTefService], // exporta para poder usar em outros módulos (ex: tef.module)
})
export class SuperTefModule {}
