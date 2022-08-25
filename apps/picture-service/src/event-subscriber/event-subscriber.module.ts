import { DatabaseModule } from '@myorg/database';
import { Module } from '@nestjs/common';
import { PictureModule } from '../picture/picture.module';
import { EventSubscriberService } from './event-subscriber.service';
import { PubsubModule } from '@myorg/pubsub'

@Module({
  providers: [EventSubscriberService],
  imports: [DatabaseModule, PictureModule, PubsubModule]
})
export class EventSubscriberModule {}
