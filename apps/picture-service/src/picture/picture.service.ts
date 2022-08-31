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
    console.log(id)
    const picture = await this.pictureModel.findOne({ id })
    if(!picture) {
      throw new NotFoundException()
    }
    
    const svg = new SVG(picture.width, picture.height)

    const { strokes } = picture
    for(const stroke of strokes) {
      const { x: x1, y: y1 } = stroke.begin
      const { x: x2, y: y2 } = stroke.end
      svg.line(x1,x2,y1,y2, stroke.color, stroke.width)
    }
    return svg.end().src
  }
}
