import { Get, Header, Controller, Param, Query, NotFoundException } from '@nestjs/common';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {

  constructor(
    private readonly pictureService: PictureService
  ) {}

  @Get()
  @Header('Content-Type', 'image/svg+xml')
  async getPicture(
    @Query('id') pictureId: string
  ) {
      const svg = await this.pictureService.getPicture(pictureId)
      return `<html><body>${svg}</body></html>` 
  }
}
