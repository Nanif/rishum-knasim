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
//             from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
        let arrayOfData = this.converDataToArryas(data)
        const mailOptions: ISendMailOptions = {
            to: 'shmuraknasim@gmail.com', // sender address
            from: `neomi2152@gmail.com`, // list of receivers
            subject: 'nedarim data', // Subject line
            html: `
                    <span> ${arrayOfData[0] ? arrayOfData[0].key : ''}</span> :    <span>${arrayOfData[0] ? arrayOfData[0].value : ''}  </span>&&
                    <span> ${arrayOfData[1] ? arrayOfData[1].key : ''}</span> :    <span>${arrayOfData[1] ? arrayOfData[1].value : ''}  </span>&&
                    <span> ${arrayOfData[2] ? arrayOfData[2].key : ''}</span> :    <span>${arrayOfData[2] ? arrayOfData[2].value : ''}  </span>&&
                    <span> ${arrayOfData[3] ? arrayOfData[3].key : ''}</span> :    <span>${arrayOfData[3] ? arrayOfData[3].value : ''}  </span>&&
                    <span> ${arrayOfData[4] ? arrayOfData[4].key : ''}</span> :    <span>${arrayOfData[4] ? arrayOfData[4].value : ''}  </span>&&
                    <span> ${arrayOfData[5] ? arrayOfData[5].key : ''}</span> :    <span>${arrayOfData[5] ? arrayOfData[5].value : ''}  </span>&&
                    <span> ${arrayOfData[6] ? arrayOfData[6].key : ''}</span> :    <span>${arrayOfData[6] ? arrayOfData[6].value : ''}  </span>&&
                    <span> ${arrayOfData[7] ? arrayOfData[7].key : ''}</span> :    <span>${arrayOfData[7] ? arrayOfData[7].value : ''}  </span>&&
                    <span> ${arrayOfData[8] ? arrayOfData[8].key : ''}</span> :    <span>${arrayOfData[8] ? arrayOfData[8].value : ''}  </span>&&
                    <span> ${arrayOfData[9] ? arrayOfData[9].key : ''}</span> :    <span>${arrayOfData[9] ? arrayOfData[9].value : ''}  </span>&&
                    <span> ${arrayOfData[10] ? arrayOfData[10].key : ''}</span> :    <span>${arrayOfData[10] ? arrayOfData[10].value : ''} </span> &&
                    <span> ${arrayOfData[11] ? arrayOfData[11].key : ''}</span> :    <span>${arrayOfData[11] ? arrayOfData[11].value : ''} </span> &&
                    <span> ${arrayOfData[12] ? arrayOfData[12].key : ''}</span> :    <span>${arrayOfData[12] ? arrayOfData[12].value : ''} </span> &&
                    <span> ${arrayOfData[13] ? arrayOfData[13].key : ''}</span> :    <span>${arrayOfData[13] ? arrayOfData[13].value : ''} </span> &&
                    <span> ${arrayOfData[14] ? arrayOfData[14].key : ''}</span> :    <span>${arrayOfData[14] ? arrayOfData[14].value : ''} </span> &&
                    <span> ${arrayOfData[15] ? arrayOfData[15].key : ''}</span> :    <span>${arrayOfData[15] ? arrayOfData[15].value : ''} </span> &&
                    <span> ${arrayOfData[16] ? arrayOfData[16].key : ''}</span> :    <span>${arrayOfData[16] ? arrayOfData[16].value : ''} </span> &&
                    <span> ${arrayOfData[17] ? arrayOfData[17].key : ''}</span> :    <span>${arrayOfData[17] ? arrayOfData[17].value : ''} </span> &&
                    <span> ${arrayOfData[18] ? arrayOfData[18].key : ''}</span> :    <span>${arrayOfData[18] ? arrayOfData[18].value : ''} </span> &&
                    <span> ${arrayOfData[19] ? arrayOfData[19].key : ''}</span> :    <span>${arrayOfData[19] ? arrayOfData[19].value : ''} </span> &&
                    <span> ${arrayOfData[20] ? arrayOfData[20].key : ''}</span> :    <span>${arrayOfData[20] ? arrayOfData[20].value : ''} </span> &&
`,
        }
        this.mailerService.sendMail(mailOptions).then(() => {

        }).catch((error) => {
            this.mailerService.sendMail({
                to: 'neomi2152@gmail.com', // sender address
                from: `neomi2152@gmail.com`,
                subject: 'ארעה שגיאה :)',
                text: ` לא נשלחו הפרטים של התרומה למייל של שמורה`,
                html: ` כתובת המייל:  <p>${data.Email}</p> 
                          <p> מחיר: ${data.Amount}</p> 
                        <p> השגיאה: ${error}</p>
                       `
            })
        })
    }

    public async sendApplicationMail(data) {
        //   from: `neomi2152@gmail.com`,
        const mailOptions: ISendMailOptions = {
            to: data.Mail, // sender address
            from: `${process.env.GMAIL_SMTP_USER}`,
            subject: 'כרטיס כניסה לכנס יהיו לרצון',
            html: `
                   <div style="font-size: 16px">
                        <b style="font-size: 18px">${data.ClientName} יקרה 
                           </b>  
                        <br>
                        <p>תודה שרצית להיות חלק,</p>
                        <p>שמחות שבחרת לפסוע איתנו במסלול העולה-</p>
                        <p>ויהי רצון שיעלה לרצון לפניו יתברך....</p>
                        <p>מצורף כרטיס הכניסה שלך לכנס,</p>
                        <p>נא הדפיסי והציגי אותו בכניסה לאולם.</p>
                        <p>מחכות לראותך,</p>
                        <p>צוות השמורה</p>
                    </div>
                    <div>
                            <img src="http://shmura.org/wp-content/uploads/2019/09/card.jpg" alt="" style="width: auto; height: auto">

                    
                         
                    </div>
             `,
        };

        this.mailerService.sendMail(mailOptions).then(() => {
        }).catch((error) => {
            this.mailerService.sendMail({
                to: 'neomi2152@gmail.com', // sender address
                from: `neomi2152@gmail.com`,
                subject: 'ארעה שגיאה :)',
                text: `לא נשלח כרטיס כניסה לכנס עבור מייל זה`,
                html: ` כתובת אמייל: <p>${data.Email}</p> 
     <p>מחיר לכרטיס :  ${data.Amount} </p> 
 <p>${error}</p>
`
            })
        })
    }
}

