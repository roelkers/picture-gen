import { Module } from '@nestjs/common';
import { SvgGeneratorService } from '../svg-generator/svg-generator.service';

@Module({
  controllers: [],
  providers: [SvgGeneratorService],
  exports: [SvgGeneratorService],
})
export class SvgGeneratorModule {}
