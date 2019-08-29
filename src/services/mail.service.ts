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


    private converDataToArryas(data) {
        let newArray = []
        Object.keys(data).forEach((key) => {
            newArray.push({key: key, value: data[key]})
        });
        return newArray
    }

    public async sendDataForSaveIt(data) {

        let arrayOfData = this.converDataToArryas(data)
        const mailOptions: ISendMailOptions = {
            to: 'shmuraknasim@gmail.com', // sender address
            from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
                subject: 'nedarim data', // Subject line
            html: `
                    <p>${data[0]}</p>
                    <p>${data[1]}</p>
                    <p>${data[2]}</p>
                    <p>${data[3]}</p>
                    <p>${data[4]}</p>
                    <p>${data[5]}</p>
                    <p>${data[6]}</p>
                    <p>${data[7]}</p>
                    <p>${data[8]}</p>
                    <p>${data[9]}</p>
                    <p>${data[10]}</p>
                    <p>${data[11]}</p>
                    <p>${data[11]}</p>
                    <p>${data[12]}</p>
                    <p>${data[13]}</p>
                    <p>${data[14]}</p>
                    <p>${data[15]}</p>
                    <p>${data[16]}</p>
                    <p>${data[17]}</p>
                    <p>${data[18]}</p>
                    <p>${data[19]}</p>
                    <p>${data[20]}</p>
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