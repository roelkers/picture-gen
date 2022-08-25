import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { IPicture } from '@myorg/types'
import { PubsubSubscriberService } from '@myorg/pubsub';

@Injectable()
export class EventSubscriberService {
  constructor(
    @Inject('PICTURE_MODEL')
    private pictureModel: Model<IPicture>,
    private readonly pubsubSubscriberService: PubsubSubscriberService
  ) {}

  onModuleInit() {
   const handleMessage = async () => {
     console.log("got message")
      await this.pictureModel.create({
         strokes: [
           {
             begin: { x: 200, y: 700 },
             end: { x: 100, y: 100 },
             color: 'green'
           }
         ]  
      }) 
    }
    this.pubsubSubscriberService.subscribe(
      handleMessage
    )
  }
}
