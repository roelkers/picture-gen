import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMouseEvent, IPicture, IPubsubMessage } from '@myorg/types';
import { PubsubSubscriberService } from '@myorg/pubsub';
import { isSameMinute, isSameSecond } from 'date-fns'
import { rgb } from 'color-convert' 

const MAX_DISTANCE_FOR_LINE = 150;

@Injectable()
export class EventSubscriberService {
  constructor(
    @Inject('PICTURE_MODEL')
    private pictureModel: Model<IPicture>,
    private readonly pubsubSubscriberService: PubsubSubscriberService
  ) {}

  private generateColor() {
    rgb.hsl(
      255 * Math.random(),
      255 * Math.random(),
      255 * Math.random(),
    )
  }

  async createPicture(data: IMouseEvent) {
    console.log(data)
    await this.pictureModel.create({
      id: data.pictureId,
      strokes: [],
      points: [],
      lastEvent: {
        data,
        time: new Date()
      }
    });
  }

  async pushLine(previousData: IMouseEvent, data: IMouseEvent, color: string) {
    await this.pictureModel.updateOne({
      id: data.pictureId,
      $push: {
        strokes: {
          begin: {
            x: previousData.x,
            y: previousData.y,
          },
          end: {
            x: data.x,
            y: data.y,
          },
          color,
        },
      },
      lastEvent: {
        time: new Date(),
        data,
      }
    });
  }

  private async updateLastEvent(data: IMouseEvent) {
    await this.pictureModel.updateOne({
      id: data.pictureId,
      lastEvent: {
        time: new Date(),
        data,
        color: this.generateColor()
      }
    });
  }

  private computeDistance(dataA: IMouseEvent, dataB: IMouseEvent) {
    return Math.sqrt(
      Math.pow(dataA.x - dataB.x, 2) + Math.pow(dataA.y - dataB.y, 2)
    );
  }

  private updatePicture(picture: IPicture, data: IMouseEvent) {
    console.log(picture.lastEvent)
    const previousData = picture.lastEvent.data;
    if (
      this.computeDistance(data, previousData) < MAX_DISTANCE_FOR_LINE &&
      isSameMinute(picture.lastEvent.time, new Date())
    ) {
      return this.pushLine(previousData, data, picture.lastEvent.color);
    }
    return this.updateLastEvent(data);
  }

  onModuleInit() {
    const handleMessage = async (message: IPubsubMessage) => {
      const data = JSON.parse(Buffer.from(message.data).toString()) as IMouseEvent;
      const picture = await this.pictureModel.findOne({ id: data.pictureId });
      if (!picture) {
        this.createPicture(data);
        return message.ack();
      }
      this.updatePicture(picture, data);
      message.ack()
    };
    this.pubsubSubscriberService.subscribe(handleMessage);
  }

}
