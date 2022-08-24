import { Injectable } from '@nestjs/common';
import { PubSub, Subscription } from '@google-cloud/pubsub'

@Injectable()
export class SubscriberService {
  private pubsub: PubSub

  async onModuleInit() {
    this.pubsub = new PubSub({ projectId: 'mouse-events' })
  }

  async subscribe(topicName: string, subscriptionName: string, callback: () => void) {
    try {
      await this.pubsub.createTopic(topicName);
      console.log(`Topic ${topicName} created.`);
    } catch(error: unknown) {
      console.log('Topic "clicks" already exists')
    }
    let subscription
    try {
      subscription = await this.pubsub.topic(topicName).createSubscription(subscriptionName)
      console.log(`Subscription ${subscriptionName} created.`);
    } catch(error: unknown) {
      console.log('Subscription already exists')
      subscription = await this.pubsub.subscription(subscriptionName)
    }
    subscription

  }
}
