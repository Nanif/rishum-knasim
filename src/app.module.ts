import { AppController } from './controllers/app.controller';
import { PdfFileService } from "./services/pdfFile.service";
import { AppService } from './services/app.service';
import { MailService } from './services/mail.service';
import { MongoDBService } from './services/mongoDB.service';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  controllers:[AppController],
  providers:[AppService, PdfFileService , MailService, MongoDBService],
  imports: [
    MailerModule.forRoot({
      transport: `smtp://${process.env.GMAIL_SMTP_USER}:${process.env.GMAIL_SMTP_PASSWORD}@smtp.gmail.com`,
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