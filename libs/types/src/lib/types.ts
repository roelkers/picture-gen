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
  }],
  points: IPoint[],
  color: string
}
