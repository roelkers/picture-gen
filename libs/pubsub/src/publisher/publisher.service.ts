import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub'
import { IMouseEvent } from '@myorg/types'

@Injectable()
export class PubsubPublisherService {
  private pubsub: PubSub
  private readonly topicName = 'clicks'

  async onModuleInit() {
    this.pubsub = new PubSub({ projectId: 'mouse-events' })
    try {
      await this.pubsub.createTopic(this.topicName);
      console.log(`Topic ${this.topicName} created.`);
    } catch(error: unknown) {
      console.log('Topic "clicks" already exists')
    }
  }

  async pushMouseEvent(event: IMouseEvent) {
    console.log(event)
    await this.pubsub
    .topic(this.topicName)
    .publishMessage({
        data: Buffer.from(JSON.stringify({
          ...event
      }))
    })
  } 
}
