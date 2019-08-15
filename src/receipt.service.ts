import {Injectable } from "@nestjs/common";
const PDFDocument = require('pdfkit');
const fs = require('fs');
const puppeteer = require('puppeteer')
@Injectable()
export class ReceiptService {

    constructor() {
    }

    public filePath: 'Naomi.pdf';

    public async pdf() {



        // async function printPDF() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('C:\\shmura\\rishum-knasim\\src\\receipt.html');
        const pdf = await page.pdf({ format: 'A4' });

        await browser.close();
        // return pdf
        // })
        const writeStream = fs.createWriteStream('bla.pdf');
        writeStream.write(pdf);
        writeStream.end();//
// // Create a document
//         const doc = new PDFDocument();
//
// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
//         doc.pipe(fs.createWriteStream('output.pdf'));
//
// // Embed a font, set the font size, and render some text
// //         doc.font('fonts/PalatinoBold.ttf')
// //             .fontSize(25)
// //             .text('Some text with an embedded font!', 100, 100);
//
// // Add an image, constrain it to a given size, and center it vertically and horizontally
// //         doc.image('path/to/image.png', {
// //             fit: [250, 300],
// //             align: 'center',
// //             valign: 'center'
// //         });
//
// // Add another page
// //         doc.addPage()
// //             .fontSize(25)
// //             .text('Here is some vector graphics...', 100, 100);
//
// // Draw a triangle
//         doc.save()
//             .moveTo(100, 150)
//             .lineTo(100, 250)
//             .lineTo(200, 250)
//             .fill("#FF3300");
//
// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
//         doc.scale(0.6)
//             .translate(470, -380)
//             .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//             .fill('red', 'even-odd')
//             .restore();
//
// // Add some text with annotations
//         doc.addPage()
//             .fillColor("blue")
//             .text('Here is a link!', 100, 100)
//             .underline(100, 100, 160, 27, {color: "#0000FF"})
//             .link(100, 100, 160, 27, 'http://google.com/');
//
// // Finalize PDF file
//         doc.end();
    }

    public getFilePath(): string {
        return this.filePath
    }
}

// import {Injectable } from "@nestjs/common";
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// @Injectable()
// export class ReceiptService {
//
//     constructor() {
//     }
//
//     public filePath: 'Naomi.pdf';
//
//     public async pdf() {
//
//
// // Create a document
//         const doc = new PDFDocument();
//
// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
//         doc.pipe(fs.createWriteStream('output.pdf'));
//
//         const NAME = 'שמורה במבול ע.ר';
//         const ADDRESS = 'הפסגה 36 בית וגן ירושלים';
//
//         doc.text(` ${NAME}  ${ADDRESS}`, {
//                 width: 500,
//                 align: 'center'
//             }
//         );
//
// // draw bounding rectangle
//         doc.rect(doc.x, 0, 410, doc.y).stroke();
// // Finalize PDF file
//         doc.end();
//     }
//
//     public getFilePath(): string {
//         return this.filePath
//     }
// }