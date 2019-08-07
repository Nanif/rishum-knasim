import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MailService} from "./mail.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly mailService: MailService) {
  }

  @Get('aaa')
  getHello(): string {
    let message = this.mailService.example3();
    console.log(message);
    return this.appService.getHello();
  }
}
