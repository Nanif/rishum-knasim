import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {MailService} from "./mail.service";
import {ContactForm} from "./ContactForm";
import {ReceiptService} from "./receipt.service";
import NedarimData from "./nedarimData";
import {NedatimDataService} from "./nedatim.data.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly mailService: MailService,
                private readonly nedarimDataService: NedatimDataService) {
    }

    @Post('sendReceipt')
    SendReceipt(@Body() data) {
        let nedarimData: NedarimData = {
          FirstName: data.PrivateName,
          LastNAme: data.FamilyName,
          creditTerms: data.creditTerms,
          Email: data.Email,
          HomeAddress: data.HomeAddress,
          PhoneHand: data.PhoneHand
        }
      this.nedarimDataService.setNedarimData(nedarimData)
    }

    @Get('aaa')
    getHello(): string {
        // let data: NedarimData = {
        //
        // }
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
