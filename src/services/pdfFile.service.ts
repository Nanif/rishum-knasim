import {Injectable} from "@nestjs/common";

const fs = require('fs');
const puppeteer = require('puppeteer')

@Injectable()
export class PdfFileService {

    constructor() {
    }

    private getTodayDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    private filePath;

    public async createPdf(data) {
        let todayDate = this.getTodayDate()
        let pdfTemplate = `<!DOCTYPE html>
<meta charset="utf-8">
<body>
<script src="../receipt.js"></script>
<div class="wrapper_all_page">
    <div class="top_panel_wrapper">
        <div class="shmura_description">
            <p class="pppp">.שמורה במבול ע.ר</p>
            <p class="aapp">מספר מוסד 580640159</p>
        </div>
        <div class="shmura_address">
            <p>הפסגה 36 בית וגן ירושלים</p>
        </div>
    </div>
    <div class="receipt_details_section">
        <div class="receipt_title">
            <div>קבלה</div>
            <div>מספר</div>
            <div>העתק</div>
        </div>
        <hr>
        <div class="receipt_details">
            <div>
                <span>תאריך הנפקה:</span>
                <span>${todayDate}</span>
            </div>
            <div>
                <span>תאריך תשלום:</span>
                <span>${todayDate}</span>
            </div>
            <div>
                <span>לכבוד:</span>
                <span>${data.PrivateName}</span>
            </div>
            <div>
                <span>טלפון:</span>
                <span>${data.PhoneHand}</span>
            </div>
            <div>
                <span>${data.Email}</span>
                <span>:דוא''ל</span>
            </div>
        </div>
    </div>
    <div class="written_proof_section">
        <span class="written_proof">:אסמכתא</span>
        <table class="tbl_written_proof">
            <tr>
                <th>עבור</th>
                <th>סוג תשלום</th>
                <th>פירוט</th>
                <th>כמות</th>
                <th>מחיר</th>
                <th>סה''כ לתשלום</th>
            </tr>
            <tr>
                <td class="for">כרטיס כניסה אלול </td>
                <td class="payment_type">כרטיס אשראי</td>
                <td class="particulars">פאג''י 06/21 593</td>
                <td class="amount">2</td>
                <td class="price">10.10</td>
                <td class="sum">20</td>
            </tr>
        </table>
    </div>
</div>
<style>
    .wrapper_all_page {
        width: 90%;
        margin: auto;
        font-family: Calibri;
        font-weight: 600;
    }

    .top_panel_wrapper {
        border: 1px black solid;
        height: 120px;
        padding: 15px;
        margin-top: 200px;
    }

    .shmura_description {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
    }

    .shmura_address {
        display: flex;
        flex-direction: row-reverse;
    }

    .receipt_details_section {
        padding: 50px;
    }

    .receipt_title {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .receipt_details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .written_proof_section {
        display: flex;
        flex-direction: column;
    }

    .written_proof {
        display: flex;
        justify-content: center;
        text-decoration: underline;
        margin-bottom: 15px;
    }

    .tbl_written_proof {
        width: 100%;
    }
    tr {
        text-align: end;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>
</body>
</html>`
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setContent(pdfTemplate);
        setTimeout(async () => {
            const pdf = await page.pdf({format: 'A4'});
            const writeStream = fs.createWriteStream(`${data.ArmyID}.pdf`);
            writeStream.write(pdf);
            writeStream.end();
        }, 3000);
    }
}