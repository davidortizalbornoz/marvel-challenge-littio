import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Character } from './model/character.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  init(): Promise<Character[]> {
    return this.appService.init();
  }
}
