import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {MailService} from "../services/mail.service";
import {PdfFileService} from "../services/pdfFile.service";
import {MongoDBService} from '../services/mongoDB.service';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly mailService: MailService,
                private readonly pdfFileService: PdfFileService,
                private readonly mongoDBService: MongoDBService
    ) {
    }


    @Post('savePersonalData')
    SendReceipt(@Body() data) {
        console.log('hgjskdfghjfk');
        this.mailService.savePersonalData(data).then(() => {
            console.log('data sent....')
        }).catch((error) => {
            console.log('data didnt saved', error, data)
        });
    }


    @Post('sendReceipt')
    SendReceipt(@Body() data) {
        // send data to knasim@gmail.com mail
        this.mailService.sendDataForSaveIt(data).then(() => {
            console.log('data sent....')
        }).catch((error) => {
            console.log('data didnt saved', error, data)
        });

        // send card to user email
        let isRishumKnasim = true;
        if (data.Groupe) {
            isRishumKnasim = data.Groupe === 'שמועה' || data.Groupe === 'תרומה לשמורה' ? false : true
        }
        if (isRishumKnasim) {
            this.mailService.sendApplicationMail(data).then(() => {
                console.log('card sent')
            }).catch((error) => {
                console.log('card didnt sent', error, data)
            });
        }

        //save data in mongodb
        // @ts-ignore
        // this.mongoDBService.saveDataInDb(data).then((res) => {
        //     console.log('res', res)
        // }).catch((error) => {
        //     console.log('error', error);
        // });
    }
}
