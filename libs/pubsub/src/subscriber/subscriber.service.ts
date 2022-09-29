import { Injectable } from '@nestjs/common';
import { PubSub, } from '@google-cloud/pubsub'
import { PubsubMessage } from '@google-cloud/pubsub/build/src/publisher';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PubsubSubscriberService {
  private pubsub: PubSub
  private readonly topicName = 'clicks'
  private readonly subscriptionName = 'clicksSubscription'

  constructor(
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.pubsub = new PubSub({ projectId: this.configService.get('PROJECT_ID') })
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

  async subscribe(handler: (message: PubsubMessage) => void) {
    this.pubsub = new PubSub({ projectId: this.configService.get('PROJECT_ID') })
    this.pubsub.topic(this.topicName).subscription(this.subscriptionName)
    .on('message', handler)
  }
}
