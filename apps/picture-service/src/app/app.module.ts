import { Module } from '@nestjs/common';
import { EventSubscriberModule } from '../event-subscriber/event-subscriber.module';
import { EventSubscriberService } from '../event-subscriber/event-subscriber.service';
import { PictureModule } from '../picture/picture.module';
import { PubsubModule } from '@myorg/pubsub'

@Module({
  imports: [EventSubscriberModule, PictureModule, PubsubModule],
  controllers: [],
  providers: [EventSubscriberService],
})
export class AppModule {}
