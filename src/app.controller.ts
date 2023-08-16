import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
//hello est un prefix ici
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // hello est une path ici donc on a hello/hello
  getHello(): string {
    return this.appService.getHello();
  }

}
