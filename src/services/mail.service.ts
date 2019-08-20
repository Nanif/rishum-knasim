import {MailerService} from "@nest-modules/mailer";
import {Injectable} from "@nestjs/common";
import {ContactForm} from "../ContactForm";
import {ISendMailOptions} from "../ISendMailOptions.interface";
import {PdfFileService} from "./pdfFile.service";

const fs = require('fs')

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
                private readonly receiptService: PdfFileService) {
    }

    public async sendApplicationMail(data) {
        const mailOptions: ISendMailOptions = {
            to: 'neomi2152@gmail.com', // sender address
            from: 'neomi2152@gmail.com', // list of receivers
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
            attachments: [{
                filename: 'קבלה.pdf',
                path: `${data.ArmyID}.pdf`
            }],
        };

        this.mailerService.sendMail(mailOptions).then(() => {
            fs.unlink(`${data.ArmyID}.pdf`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('removed!')
            })
        }).catch(err => {
            console.log(err);
        });
    }
}