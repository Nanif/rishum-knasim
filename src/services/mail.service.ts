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
                    <div> ${arrayOfData[0]? arrayOfData[0].key: ''}</div>  && <div>${arrayOfData[0]? arrayOfData[0].value: ''}</div>
                    <div> ${arrayOfData[1]? arrayOfData[1].key: ''}</div>  && <div>${arrayOfData[1]? arrayOfData[1].value: ''}</div>
                    <div> ${arrayOfData[2]? arrayOfData[2].key: ''}</div>  && <div>${arrayOfData[2]? arrayOfData[2].value: ''}</div>
                    <div> ${arrayOfData[3]? arrayOfData[3].key: ''}</div>  && <div>${arrayOfData[3]? arrayOfData[3].value: ''}</div>
                    <div> ${arrayOfData[4]? arrayOfData[4].key: ''}</div>  && <div>${arrayOfData[4]? arrayOfData[4].value: ''}</div>
                    <div> ${arrayOfData[5]? arrayOfData[5].key: ''}</div>  && <div>${arrayOfData[5]? arrayOfData[5].value: ''}</div>
                    <div> ${arrayOfData[6]? arrayOfData[6].key: ''}</div>  && <div>${arrayOfData[6]? arrayOfData[6].value: ''}</div>
                    <div> ${arrayOfData[7]? arrayOfData[7].key: ''}</div>  && <div>${arrayOfData[7]? arrayOfData[7].value: ''}</div>
                    <div> ${arrayOfData[8]? arrayOfData[8].key: ''}</div>  && <div>${arrayOfData[8]? arrayOfData[8].value: ''}</div>
                    <div> ${arrayOfData[9]? arrayOfData[9].key: ''}</div>  && <div>${arrayOfData[9]? arrayOfData[9].value: ''}</div>
                    <div> ${arrayOfData[10]? arrayOfData[10].key: ''}</div> &&  <div>${arrayOfData[10]? arrayOfData[10].value: ''}</div>
                    <div> ${arrayOfData[11]? arrayOfData[11].key: ''}</div> &&  <div>${arrayOfData[11]? arrayOfData[11].value: ''}</div>
                    <div> ${arrayOfData[11]? arrayOfData[11].key: ''}</div> &&  <div>${arrayOfData[11]? arrayOfData[11].value: ''}</div>
                    <div> ${arrayOfData[12]? arrayOfData[12].key: ''}</div> &&  <div>${arrayOfData[12]? arrayOfData[12].value: ''}</div>
                    <div> ${arrayOfData[13]? arrayOfData[13].key: ''}</div> &&  <div>${arrayOfData[13]? arrayOfData[13].value: ''}</div>
                    <div> ${arrayOfData[14]? arrayOfData[14].key: ''}</div> &&  <div>${arrayOfData[14]? arrayOfData[14].value: ''}</div>
                    <div> ${arrayOfData[15]? arrayOfData[15].key: ''}</div> &&  <div>${arrayOfData[15]? arrayOfData[15].value: ''}</div>
                    <div> ${arrayOfData[16]? arrayOfData[16].key: ''}</div> &&  <div>${arrayOfData[16]? arrayOfData[16].value: ''}</div>
                    <div> ${arrayOfData[17]? arrayOfData[17].key: ''}</div> &&  <div>${arrayOfData[17]? arrayOfData[17].value: ''}</div>
                    <div> ${arrayOfData[18]? arrayOfData[18].key: ''}</div> &&  <div>${arrayOfData[18]? arrayOfData[18].value: ''}</div>
                    <div> ${arrayOfData[19]? arrayOfData[19].key: ''}</div> &&  <div>${arrayOfData[19]? arrayOfData[19].value: ''}</div>
                    <div> ${arrayOfData[20]? arrayOfData[20].key: ''}</div> &&  <div>${arrayOfData[20]? arrayOfData[20].value: ''}</div>
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