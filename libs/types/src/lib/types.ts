import { PubsubMessage } from "@google-cloud/pubsub/build/src/publisher"

export interface IMouseEvent {
  type: 'click' | 'double-click',
  x: number,
  y: number
  pictureId: string
}

export interface IPoint {
  x: number,
  y: number
}

export interface IPicture {
  id: string,
  name: string,
  strokes: [{
    begin: IPoint,
    end: IPoint,
    color: IPoint,
  }],
  points: IPoint[],
  lastEvent: {
    time: Date,
    data: IMouseEvent,
    color: string
  } 
}

export interface IPubsubMessage extends PubsubMessage{
  ack() : void
  nack(): void
}
