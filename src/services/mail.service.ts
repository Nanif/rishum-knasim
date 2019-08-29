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
                    <p>${arrayOfData[0]}</p>
                    <p>${arrayOfData[1]}</p>
                    <p>${arrayOfData[2]}</p>
                    <p>${arrayOfData[3]}</p>
                    <p>${arrayOfData[4]}</p>
                    <p>${arrayOfData[5]}</p>
                    <p>${arrayOfData[6]}</p>
                    <p>${arrayOfData[7]}</p>
                    <p>${arrayOfData[8]}</p>
                    <p>${arrayOfData[9]}</p>
                    <p>${arrayOfData[10]}</p>
                    <p>${arrayOfData[11]}</p>
                    <p>${arrayOfData[11]}</p>
                    <p>${arrayOfData[12]}</p>
                    <p>${arrayOfData[13]}</p>
                    <p>${arrayOfData[14]}</p>
                    <p>${arrayOfData[15]}</p>
                    <p>${arrayOfData[16]}</p>
                    <p>${arrayOfData[17]}</p>
                    <p>${arrayOfData[18]}</p>
                    <p>${arrayOfData[19]}</p>
                    <p>${arrayOfData[20]}</p>
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