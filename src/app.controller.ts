import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MailService} from "./mail.service";
import {ContactForm} from "./ContactForm";
import {ReceiptService} from "./receipt.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly mailService: MailService) {
  }

  @Get('aaa')
  getHello(): string {
    let contactForm: ContactForm = {
      cvFileExt: 'cvFileExt',
      cvFileType: 'cvFileType',
      email: 'email',
      fullName: 'fullName',
      message: 'message',
      position: 'position',
      tel: 'tel'
    }
    let message = this.mailService.sendApplicationMail(contactForm);
    return this.appService.getHello();
  }
}
