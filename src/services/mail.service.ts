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

    public async sendDataForSaveIt(data) {
        const mailOptions: ISendMailOptions = {
            to: 'shmuraknasim@gmail.com', // sender address
            from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
                subject: 'nedarim data', // Subject line
            html: `
                    <p>${data.functionName}</p>
                    <p>${data.ArmyID}</p>
                    <p>${data.FamilyName}</p>
                    <p>${data.PrivateName}</p>
                    <p>${data.PIDNumber}</p>
                    <p>${data.action}</p>
                    <p>${data.WorkingCompany}</p>
                    <p>${data.rAmount}</p>
                    <p>${data.nShvaIntIn}</p>
                    <p>${data.Confirmation}</p>
                    <p>${data.rCurrency}</p>
                    <p>${data.rCardNum}</p>
                    <p>${data.NoPayments}</p>
                    <p>${data.HomeAddress}</p>
`,
        }
        await this.mailerService.sendMail(mailOptions)
    }

    public async sendApplicationMail(data) {
        const mailOptions: ISendMailOptions = {
            to: data.Email, // sender address
            from: `${process.env.GMAIL_SMTP_USER}`,
            subject: 'כרטיס כניסה לכנס יהיו לרצון',
            text: `${data.PrivateName} `,
            html: `<b>נעמי יקרה</b>
                    <br>
                    <p>תודה שרצית להיות חלק,</p>
                    <p>שמחות שבחרת לפסוע איתנו במסלול העולה-</p>
                    <p>ויהי רצון שיעלה לרצון לפניו יתברך....</p>
                    <p>מצורפת קבלה עבור תשלום דמי ההשתתפות בכנס.</p>
                    <p>הקבלה היא כרטיס הכניסה שלך</p>
                    <p>נא הדפיסי והציגי אותה בכניסה לאולם.</p>
                    <p>מחכות לראותך,</p>
                    <p>צוות השמורה</p>`,
        };

        this.mailerService.sendMail(mailOptions).then(() => {
        }).catch(err => {
            console.log('sendMail', err);
        });
    }
}