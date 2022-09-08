import { Module } from '@nestjs/common';
import { EventSubscriberModule } from '../event-subscriber/event-subscriber.module';
import { EventSubscriberService } from '../event-subscriber/event-subscriber.service';
import { PictureModule } from '../picture/picture.module';
import { PubsubModule } from '@myorg/pubsub'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EventSubscriberModule,
    PictureModule,
    PubsubModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [EventSubscriberService],
})
export class AppModule {}
