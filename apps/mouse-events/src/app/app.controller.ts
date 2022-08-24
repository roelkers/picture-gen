import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { IMouseEvent } from '@myorg/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mouse-event')
  getData(
    @Body() body: IMouseEvent 
  ) {
    return this.appService.pushMouseEvent(body);
  }
}
