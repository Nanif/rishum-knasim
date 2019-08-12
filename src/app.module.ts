import { AppController } from './app.controller';
import { ReceiptService } from "./receipt.service";
import { AppService } from './app.service';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  controllers:[AppController],
  providers:[AppService, ReceiptService , MailService],
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://neomi2152@gmail.com:thigusnkcsu@smtp.gmail.com',
      defaults: {
        from:'neomi2152@gmail.com',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },

    }),
  ],
})
export class AppModule {}