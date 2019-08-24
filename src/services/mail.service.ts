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
            to: data.Email, // sender address
            from: 'neomi2152@gmail.com', // list of receivers
            subject: 'כרטיס כניסה לכנס יהיו לרצון', // Subject line
            text: `${data.PrivateName} `, // plaintext body
            html: `<b>נעמי יקרה</b>
                    <br>
                    <p>תודה שרצית להיות חלק,</p>
                    <p>שמחות שבחרת לפסוע איתנו במסלול העולה-</p>
                    <p>ויהי רצון שיעלה לרצון לפניו יתברך....</p>
                    <p>מצורפת קבלה עבור תשלום דמי ההשתתפות בכנס.</p>
                    <p>הקבלה היא כרטיס הכניסה שלך</p>
                    <p>נא הדפיסי והציגי אותה בכניסה לאולם.</p>
                    <p>מחכות לראותך,</p>
                    <p>צוות השמורה</p>`, // HTML body content
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
            console.log('sendMail', err);
        });
    }
}