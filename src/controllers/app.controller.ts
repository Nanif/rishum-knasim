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
        // this.mongoDBService.saveDataInDb(data).then((res) => {
        //     console.log('res', res)
        // }).catch((error) => {
        //     console.log('error', error);
        // });

        // let pdfFile = this.pdfFileService.createPdf(data)
        // setTimeout(() => {
            this.mailService.sendDataForSaveIt(data).then(() => {
                console.log('data sent....')
            }).catch((error) => {
                console.log('data didnt saved', error, data)
            });
            this.mailService.sendApplicationMail(data).then(() => {
                console.log('card sent')
            }).catch((error) => {
                console.log('card didnt sent', error, data)
            });;
            return this.appService.getHello();
        // }, 5000)
    }
}
