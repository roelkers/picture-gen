import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubsubModule } from '@myorg/pubsub'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PubsubModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
