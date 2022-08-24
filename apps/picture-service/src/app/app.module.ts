import { Module } from '@nestjs/common';
import { EventSubscriberModule } from '../event-subscriber/event-subscriber.module';
import { EventSubscriberService } from '../event-subscriber/event-subscriber.service';
import { PictureModule } from '../picture/picture.module';

@Module({
  imports: [EventSubscriberModule, PictureModule],
  controllers: [],
  providers: [EventSubscriberService],
})
export class AppModule {}
