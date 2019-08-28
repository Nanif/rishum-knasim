import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {MailService} from "../services/mail.service";
import {PdfFileService} from "../services/pdfFile.service";
import { MongoDBService } from '../services/mongoDB.service';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly mailService: MailService,
                private readonly pdfFileService: PdfFileService,
                private readonly mongoDBService: MongoDBService
    ) {
    }

    @Post('sendReceipt')
    SendReceipt(@Body() data) {

        // @ts-ignore
        this.mongoDBService.saveDataInDb(data);

        // let pdfFile = this.pdfFileService.createPdf(data)
        setTimeout(() => {
            let message = this.mailService.sendApplicationMail(data);
            return this.appService.getHello();
        }, 5000)
    }
}
