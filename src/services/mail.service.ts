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
        console.log('array',newArray)
        console.log('key',newArray[0].key)
        return newArray
    }

    public async sendDataForSaveIt(data) {

        let arrayOfData = this.converDataToArryas(data)
        const mailOptions: ISendMailOptions = {
            to: 'shmuraknasim@gmail.com', // sender address
            from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
                subject: 'nedarim data', // Subject line
            html: `
                    <div> <span>${arrayOfData[0].key}</span>  <span>${arrayOfData[0].value}</span></div>
                    <div> <span>${arrayOfData[1].key}</span>  <span>${arrayOfData[1].value}</span></div>
                    <div> <span>${arrayOfData[2].key}</span>  <span>${arrayOfData[2].value}</span></div>
                    <div> <span>${arrayOfData[3].key}</span>  <span>${arrayOfData[3].value}</span></div>
                    <div> <span>${arrayOfData[4].key}</span>  <span>${arrayOfData[4].value}</span></div>
                    <div> <span>${arrayOfData[5].key}</span>  <span>${arrayOfData[5].value}</span></div>
                    <div> <span>${arrayOfData[6].key}</span>  <span>${arrayOfData[6].value}</span></div>
                    <div> <span>${arrayOfData[7].key}</span>  <span>${arrayOfData[7].value}</span></div>
                    <div> <span>${arrayOfData[8].key}</span>  <span>${arrayOfData[8].value}</span></div>
                    <div> <span>${arrayOfData[9].key}</span>  <span>${arrayOfData[9].value}</span></div>
                    <div> <span>${arrayOfData[10].key}</span>  <span>${arrayOfData[10].value}</span></div>
                    <div> <span>${arrayOfData[11].key}</span>  <span>${arrayOfData[11].value}</span></div>
                    <div> <span>${arrayOfData[11].key}</span>  <span>${arrayOfData[11].value}</span></div>
                    <div> <span>${arrayOfData[12].key}</span>  <span>${arrayOfData[12].value}</span></div>
                    <div> <span>${arrayOfData[13].key}</span>  <span>${arrayOfData[13].value}</span></div>
                    <div> <span>${arrayOfData[14].key}</span>  <span>${arrayOfData[14].value}</span></div>
                    <div> <span>${arrayOfData[15].key}</span>  <span>${arrayOfData[15].value}</span></div>
                    <div> <span>${arrayOfData[16].key}</span>  <span>${arrayOfData[16].value}</span></div>
                    <div> <span>${arrayOfData[17].key}</span>  <span>${arrayOfData[17].value}</span></div>
                    <div> <span>${arrayOfData[18].key}</span>  <span>${arrayOfData[18].value}</span></div>
                    <div> <span>${arrayOfData[19].key}</span>  <span>${arrayOfData[19].value}</span></div>
                    <div> <span>${arrayOfData[20].key}</span>  <span>${arrayOfData[20].value}</span></div>
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