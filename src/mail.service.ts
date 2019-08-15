import {MailerService} from "@nest-modules/mailer";
import {Injectable} from "@nestjs/common";
import {ContactForm} from "./ContactForm";
import {ISendMailOptions} from "./ISendMailOptions.interface";
import {ReceiptService} from "./receipt.service";


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
                private readonly receiptService: ReceiptService) {}

    public async sendApplicationMail(cF: ContactForm) {

        await this.receiptService.pdf()

        const mailOptions: ISendMailOptions = {
            to: 'neomi2152@gmail.com', // sender address
            from: 'neomi2152@gmail.com', // list of receivers
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
            attachments: [{
                filename: 'קבלה.pdf',
                path: 'bla.pdf',
                cid: cF.cvFileType,
            }],
        };

        this.mailerService.sendMail(mailOptions).then(() => {
            console.log('success');
        }).catch(err => {
            console.log(err);
        });
    }
}