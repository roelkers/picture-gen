import { DatabaseModule } from '@myorg/database';
import { Module } from '@nestjs/common';
import { PictureModule } from '../picture/picture.module';
import { EventSubscriberService } from './event-subscriber.service';

@Module({
  providers: [EventSubscriberService],
  imports: [DatabaseModule, PictureModule]
})
export class EventSubscriberModule {}
