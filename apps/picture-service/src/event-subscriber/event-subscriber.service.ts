import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { IPicture } from '@myorg/types'

@Injectable()
export class EventSubscriberService {
  constructor(
    @Inject('PICTURE_MODEL')
    private pictureModel: Model<IPicture>
  ) {}

  async getData() {
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

}
