import { Injectable } from '@nestjs/common';
import { IMouseEvent } from '@myorg/types';
import { PubsubService } from '@myorg/pubsub';

@Injectable()
export class AppService {
  constructor(
    private readonly pubsubService: PubsubService
  ) {}

  pushMouseEvent(event: IMouseEvent) {
    this.pubsubService.pushMouseEvent(event)
  } 
}
