import { Module } from '@nestjs/common';
import { PubsubService } from '../pubsub/pubsub.service';

@Module({
  controllers: [],
  providers: [PubsubService],
  exports: [PubsubService],
})

export class PubsubModule {}
