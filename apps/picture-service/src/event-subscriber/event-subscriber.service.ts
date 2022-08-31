import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMouseEvent, IPicture, IPubsubMessage } from '@myorg/types';
import { PubsubSubscriberService } from '@myorg/pubsub';
import { isSameMinute, isSameSecond } from 'date-fns'
import { rgb } from 'color-convert' 

const MAX_DISTANCE_FOR_LINE = 150;
const DEFAULT_WIDTH = 750 
const DEFAULT_HEIGHT = 500

@Injectable()
export class EventSubscriberService {
  constructor(
    @Inject('PICTURE_MODEL')
    private pictureModel: Model<IPicture>,
    private readonly pubsubSubscriberService: PubsubSubscriberService
  ) {}

  private getWidth() {
    return Math.round(5* Math.random())
  }

  private generateColor() {
    const color = rgb.hex(
      255 * Math.random(),
      255 * Math.random(),
      255 * Math.random(),
    )
    return `#${color}`
  }

  private makeLastEvent(data: IMouseEvent) {
    return {
        data,
        time: new Date(),
        color: this.generateColor(),
        width: this.getWidth()
      }
  }

  async createPicture(data: IMouseEvent) {
    await this.pictureModel.create({
      id: data.pictureId,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      strokes: [],
      points: [],
      lastEvent: this.makeLastEvent(data)
    });
  }

  async pushLine(previousData: IMouseEvent, data: IMouseEvent, color: string, width: number) {
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
          width
        },
      },
      lastEvent: {
        time: new Date(),
        data,
        color,
        width
      }
    });
  }

  private async updateLastEvent(data: IMouseEvent) {
    await this.pictureModel.updateOne({
      id: data.pictureId,
      lastEvent: this.makeLastEvent(data)
    });
  }

  private computeDistance(dataA: IMouseEvent, dataB: IMouseEvent) {
    return Math.sqrt(
      Math.pow(dataA.x - dataB.x, 2) + Math.pow(dataA.y - dataB.y, 2)
    );
  }

  private updatePicture(picture: IPicture, data: IMouseEvent) {
    const previousData = picture.lastEvent.data;
    if (
      this.computeDistance(data, previousData) < MAX_DISTANCE_FOR_LINE &&
      isSameMinute(picture.lastEvent.time, new Date())
    ) {
      return this.pushLine(previousData, data, picture.lastEvent.color, picture.lastEvent.width);
    }
    return this.updateLastEvent(data);
  }

  onModuleInit() {
    const handleMessage = async (message: IPubsubMessage) => {
      const data = JSON.parse(Buffer.from(message.data).toString()) as IMouseEvent;
      const picture = await this.pictureModel.findOne({ id: data.pictureId });
      if (!picture) {
        await this.createPicture(data);
        return message.ack();
      }
      await this.updatePicture(picture, data);
      message.ack()
    };
    this.pubsubSubscriberService.subscribe(handleMessage);
  }

}
