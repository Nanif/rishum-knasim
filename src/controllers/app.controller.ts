import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {MailService} from "../services/mail.service";
import {MongoDBService} from '../services/mongoDB.service';

@Controller()
export class AppController {

    constructor(private readonly appService: AppService,
                private readonly mailService: MailService,
                private readonly mongoDBService: MongoDBService) {
    }

    @Post('savePersonalData')
    savePersonalData(@Body() data) {
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
        // tslint:disable-next-line:no-console
      console.log('data sent....');
    }).catch((error) => {
        // tslint:disable-next-line:no-console
      console.log('data didnt saved', error, data);
    });

    // send card to user email
    let isRishumKnasim = false;
    if (data.Groupe === 'כנס אלול מודיעין עילית' || data.Groupe === 'כנס אלול ירושלים' || data.Groupe === 'כנס אלול בני ברק') {
       isRishumKnasim = true;
    }

    if (isRishumKnasim) {
      this.mailService.sendApplicationMail(data).then(() => {
          // tslint:disable-next-line:no-console
        console.log('card sent');
      }).catch((error) => {
          // tslint:disable-next-line:no-console
        console.log('card didnt sent', error, data);
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
