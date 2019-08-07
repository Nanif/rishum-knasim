import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import {async} from "rxjs/internal/scheduler/async";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  public example(): void {
    this.mailerService.sendMail({
        to: 'neomi2152@gmail.com', // sender address
        from: 'neomi2152@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
          console.log('success')
      })
      .catch((e) => {
          console.log(e)
      });
  }

  public example2(): void {
    this
      .mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {
      })
      .catch(() => {
      });
  }

  public example3(): void {
    this
      .mailerService
      .sendMail({
        to: 'neomi2152@gmail.com',
        from: 'neomi2152@gmail.com',
        subject: 'Testing Nest Mailermodule with template ✔',
          template: ``,
        context: {  // Data to be sent to template engine.
          code: 'thigusnkcsu',
          username: 'neomi2152@gmail.com',
        },
      })
      .then(() => {
          console.log('success');
      })
      .catch((e) => {
          console.log(e);
      });
  }
}
