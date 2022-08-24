import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { PictureModel } from './picture.model'
import { DatabaseModule } from '@myorg/database'

@Module({
  imports: [DatabaseModule],
  providers: [PictureService, PictureModel],
  controllers: [PictureController],
  exports: [PictureModel]
})
export class PictureModule {}
