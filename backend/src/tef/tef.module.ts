import { Module } from '@nestjs/common';
import { TefService } from './tef.service';
import { TefController } from './tef.controller';
import { SuperTefModule } from 'src/integrations/superTef/superTef.module';

@Module({
  imports: [SuperTefModule],
  controllers: [TefController],
  providers: [TefService],
})
export class TefModule {}
