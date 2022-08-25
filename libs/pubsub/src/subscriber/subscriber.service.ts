import { Injectable } from '@nestjs/common';
import { PubSub, Subscription } from '@google-cloud/pubsub'

@Injectable()
export class PubsubSubscriberService {
  private pubsub: PubSub
  private readonly topicName = 'clicks'
  private readonly subscriptionName = 'clicksSubscription'

  async onModuleInit() {
    this.pubsub = new PubSub({ projectId: 'mouse-events' })
    try {
      await this.pubsub.createTopic(this.topicName);
      console.log(`Topic ${this.topicName} created.`);
    } catch(error: unknown) {
      console.log(`Topic ${this.topicName}  already exists`)
    }
    try {
      await this.pubsub.topic(this.topicName).createSubscription(this.subscriptionName)
      console.log(`Subscription ${this.subscriptionName} created.`);
    } catch (error) {
      console.log("Creating subscription did not work.")
    }
  }

  async subscribe(handler: () => void) {
    this.pubsub = new PubSub({ projectId: 'mouse-events' })
    this.pubsub.topic(this.topicName).subscription(this.subscriptionName)
    .on('message', handler)
  }
}
