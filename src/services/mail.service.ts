import {MailerService} from '@nest-modules/mailer';
import {Injectable} from '@nestjs/common';
import {ContactForm} from '../ContactForm';
import {ISendMailOptions} from '../ISendMailOptions.interface';
import {PdfFileService} from './pdfFile.service';

// tslint:disable-next-line:no-console no-var-requires
const fs = require('fs');

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
                private readonly receiptService: PdfFileService) {
    }

    public async savePersonalData(data) {
        // if (data.ticket) {
        // data.ticket.forEach((item) => {

        const arrayOfData = this.converDataToArryas(data);
        // tslint:disable-next-line:no-console
        console.log(arrayOfData);
        const mailOptions: ISendMailOptions = {
            to: 'shmurark@gmail.com', // sender address
            from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
            subject: 'personal data', // Subject line
            html: `
                    <div> ${arrayOfData[0] ? arrayOfData[0].key : ''}</div>      <div>${arrayOfData[0] ? arrayOfData[0].value : ''}  </div>&&
                    <div> ${arrayOfData[1] ? arrayOfData[1].key : ''}</div>      <div>${arrayOfData[1] ? arrayOfData[1].value : ''}  </div>&&
                    <div> ${arrayOfData[2] ? arrayOfData[2].key : ''}</div>      <div>${arrayOfData[2] ? arrayOfData[2].value : ''}  </div>&&
                   `,
        };
        // tslint:disable-next-line:no-console
        console.log('fdhfjdhfjdhf');
        this.mailerService.sendMail(mailOptions).then(() => {
            // tslint:disable-next-line:no-console
            console.log('success');
        }).catch((error) => {
            this.mailerService.sendMail({
                to: 'neomi2152@gmail.com', // sender address
                from: `neomi2152@gmail.com`,
                subject: 'ארעה שגיאה בנתונים אישיים:)',
                text: `נשמרו הפרטים האשיים טוב`,
                html: ` כתובת המייל:  <p>${data.Email}</p>
                          <p> מחיר: ${data.Amount}</p>
                        <p> השגיאה: ${error}</p>
                           <div> ${arrayOfData[0] ? arrayOfData[0].key : ''}</div>      <div>${arrayOfData[0] ? arrayOfData[0].value : ''}  </div>&&
                    <div> ${arrayOfData[1] ? arrayOfData[1].key : ''}</div>      <div>${arrayOfData[1] ? arrayOfData[1].value : ''}  </div>&&
                    <div> ${arrayOfData[2] ? arrayOfData[2].key : ''}</div>      <div>${arrayOfData[2] ? arrayOfData[2].value : ''}  </div>&&
                    <div> ${arrayOfData[3] ? arrayOfData[3].key : ''}</div>      <div>${arrayOfData[3] ? arrayOfData[3].value : ''}  </div>&&
                    <div> ${arrayOfData[4] ? arrayOfData[4].key : ''}</div>      <div>${arrayOfData[4] ? arrayOfData[4].value : ''}  </div>&&

                       `
            });
        });
        // })
        // }
    }

    private converDataToArryas(data) {
        const newArray = [];
        Object.keys(data).forEach((key) => {
            newArray.push({key, value: data[key]});
        });
        return newArray;
    }

    public async sendDataForSaveIt(data) {
//             from: `${process.env.GMAIL_SMTP_USER}`, // list of receivers
        const arrayOfData = this.converDataToArryas(data);

        const mailOptions: ISendMailOptions = {
            to: 'shmuraknasim@gmail.com', // sender address
            from: `neomi2152@gmail.com`, // list of receivers
            subject: 'nedarim data', // Subject line
            html: `
                    <div> ${arrayOfData[0] ? arrayOfData[0].key : ''}</div>      <div>${arrayOfData[0] ? arrayOfData[0].value : ''}  </div>&&
                    <div> ${arrayOfData[1] ? arrayOfData[1].key : ''}</div>      <div>${arrayOfData[1] ? arrayOfData[1].value : ''}  </div>&&
                    <div> ${arrayOfData[2] ? arrayOfData[2].key : ''}</div>      <div>${arrayOfData[2] ? arrayOfData[2].value : ''}  </div>&&
                    <div> ${arrayOfData[3] ? arrayOfData[3].key : ''}</div>      <div>${arrayOfData[3] ? arrayOfData[3].value : ''}  </div>&&
                    <div> ${arrayOfData[4] ? arrayOfData[4].key : ''}</div>      <div>${arrayOfData[4] ? arrayOfData[4].value : ''}  </div>&&
                    <div> ${arrayOfData[5] ? arrayOfData[5].key : ''}</div>      <div>${arrayOfData[5] ? arrayOfData[5].value : ''}  </div>&&
                    <div> ${arrayOfData[6] ? arrayOfData[6].key : ''}</div>      <div>${arrayOfData[6] ? arrayOfData[6].value : ''}  </div>&&
                    <div> ${arrayOfData[7] ? arrayOfData[7].key : ''}</div>      <div>${arrayOfData[7] ? arrayOfData[7].value : ''}  </div>&&
                    <div> ${arrayOfData[8] ? arrayOfData[8].key : ''}</div>      <div>${arrayOfData[8] ? arrayOfData[8].value : ''}  </div>&&
                    <div> ${arrayOfData[9] ? arrayOfData[9].key : ''}</div>      <div>${arrayOfData[9] ? arrayOfData[9].value : ''}  </div>&&
                    <div> ${arrayOfData[10] ? arrayOfData[10].key : ''}</div>    <div>${arrayOfData[10] ? arrayOfData[10].value : ''} </div> &&
                    <div> ${arrayOfData[11] ? arrayOfData[11].key : ''}</div>    <div>${arrayOfData[11] ? arrayOfData[11].value : ''} </div> &&
                    <div> ${arrayOfData[12] ? arrayOfData[12].key : ''}</div>    <div>${arrayOfData[12] ? arrayOfData[12].value : ''} </div> &&
                    <div> ${arrayOfData[13] ? arrayOfData[13].key : ''}</div>    <div>${arrayOfData[13] ? arrayOfData[13].value : ''} </div> &&
                    <div> ${arrayOfData[14] ? arrayOfData[14].key : ''}</div>    <div>${arrayOfData[14] ? arrayOfData[14].value : ''} </div> &&
                    <div> ${arrayOfData[15] ? arrayOfData[15].key : ''}</div>    <div>${arrayOfData[15] ? arrayOfData[15].value : ''} </div> &&
                    <div> ${arrayOfData[16] ? arrayOfData[16].key : ''}</div>    <div>${arrayOfData[16] ? arrayOfData[16].value : ''} </div> &&
                    <div> ${arrayOfData[17] ? arrayOfData[17].key : ''}</div>    <div>${arrayOfData[17] ? arrayOfData[17].value : ''} </div> &&
                    <div> ${arrayOfData[18] ? arrayOfData[18].key : ''}</div>    <div>${arrayOfData[18] ? arrayOfData[18].value : ''} </div> &&
                    <div> ${arrayOfData[19] ? arrayOfData[19].key : ''}</div>    <div>${arrayOfData[19] ? arrayOfData[19].value : ''} </div> &&
                    <div> ${arrayOfData[20] ? arrayOfData[20].key : ''}</div>    <div>${arrayOfData[20] ? arrayOfData[20].value : ''} </div> &&
`,
        };
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
            });
        });
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
                            <img src="http://shmura.org/wp-content/uploads/2019/09/eneterCard.jpg" alt="" style="width: 500px; height: auto">

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
            });
        });
    }
}