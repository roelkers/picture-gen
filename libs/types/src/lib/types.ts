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
  width: number,
  height: number,
  strokes: [{
    begin: IPoint,
    end: IPoint,
    color: string,
    width: number
  }],
  points: IPoint[],
  lastEvent: {
    time: Date,
    data: IMouseEvent,
    color: string,
    width: number
  } 
}

export interface IPubsubMessage extends PubsubMessage{
  ack() : void
  nack(): void
}
