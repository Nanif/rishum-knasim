import {Injectable } from "@nestjs/common";
import {PDFDocument, StandardFonts, rgb, degrees} from 'pdf-lib'
let fs = require('fs');

@Injectable()
export class ReceiptService {

    constructor() {
    }

    public filePath: 'Naomi.pdf';

    public async pdf() {

        const pdfDoc = await PDFDocument.create()
// Embed the Times Roman font
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// Add a blank page to the document
        const page = pdfDoc.addPage()

// Get the width and height of the page
        const {width, height} = page.getSize()

// Draw a string of text toward the top of the page
        const fontSize = 30
        // const jpgUrl = 'http://shmura.org/wp-content/uploads/2019/06/unnamed.jpg'
        // const jpgImageBytes = await this.http.get(jpgUrl).subscribe(res => res.arrayBuffer())

        const jpgImage = await pdfDoc.embedJpg('shmura.jpg')
        const jpgDims = jpgImage.scale(0.5)


        // page.drawImage(jpgImage, {
        //     x: 25,
        //     y: 25,
        //     width: jpgDims.width,
        //     height: jpgDims.height,
        // });
        page.drawText('Creating PDFs in JavaScript is awesome!', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        })

// Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        fs.appendFile(`${this.filePath}`, pdfBytes, function (err) {
            if (err) {
                throw(err);
            } else {
            }
        });

        console.log(pdfBytes);
    }

    public getFilePath(): string {
        return this.filePath
    }
}