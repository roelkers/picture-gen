import { Injectable } from '@nestjs/common';
import { IMouseEvent } from '@myorg/types';
import { PubsubPublisherService } from '@myorg/pubsub';

@Injectable()
export class AppService {
  constructor(
    private readonly pubsubPublisherService: PubsubPublisherService
  ) {}

  pushMouseEvent(event: IMouseEvent) {
    this.pubsubPublisherService.pushMouseEvent(event)
  } 
}
