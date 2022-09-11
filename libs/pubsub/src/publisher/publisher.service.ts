import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub'
import { IMouseEvent } from '@myorg/types'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PubsubPublisherService {
  private pubsub: PubSub
  private readonly topicName = 'clicks'

  constructor(
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.pubsub = new PubSub({ projectId: this.configService.get('PROJECT_ID') })
    try {
      await this.pubsub.createTopic(this.topicName);
      console.log(`Topic ${this.topicName} created.`);
    } catch(error: unknown) {
      console.log('Topic "clicks" already exists')
    }
  }

  async pushMouseEvent(event: IMouseEvent) {
    await this.pubsub
    .topic(this.topicName)
    .publishMessage({
        data: Buffer.from(JSON.stringify({
          ...event
      }))
    })
  } 
}
