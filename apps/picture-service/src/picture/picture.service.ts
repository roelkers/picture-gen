import { IPicture } from '@myorg/types';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SVG } from '@myorg/svg-generator'

@Injectable()
export class PictureService {

  constructor(
    @Inject('PICTURE_MODEL')
    private pictureModel: Model<IPicture>,
  ) {}

  async getPicture(id: string) {
    const picture = await this.pictureModel.findOne({ id })
    const svg = new SVG(500, 500)

    if(!picture) {
      return svg.text(250, 250, "Picture not found.").end().src
    }

    const { strokes } = picture
    if(strokes.length <= 0) {
      svg.text(250, 250, "No strokes in picture yet.").end().src
    }
    for(const stroke of strokes) {
      const { x: x1, y: y1 } = stroke.begin
      const { x: x2, y: y2 } = stroke.end
      svg.line(x1,x2,y1,y2, stroke.color, stroke.width)
    }
    return svg.end().src
  }
}
