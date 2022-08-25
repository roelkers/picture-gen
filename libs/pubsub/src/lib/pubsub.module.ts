import { Module } from '@nestjs/common';
import { PubsubPublisherService } from '../publisher/publisher.service';
import { PubsubSubscriberService } from '../subscriber/subscriber.service';

@Module({
  controllers: [],
  providers: [PubsubPublisherService, PubsubSubscriberService],
  exports: [PubsubPublisherService, PubsubSubscriberService],
})

export class PubsubModule {}
