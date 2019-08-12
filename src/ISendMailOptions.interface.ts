// import {Stream} from "stream";
// import {ISendMailOptions} from "@nest-modules/mailer";
//
// export interface MyISendMailOptions extends ISendMailOptions {
//     to?: string;
//     from?: string;
//     subject?: string;
//     text?: string;
//     html?: string;
//
//     template?: string;
//     context?: {
//         [name: string]: any;
//     };
//     attachments?: {
//         filename: string,
//         content?: Stream,
//         path?: string,
//         contentType: string
//     }
// }
import { SendMailOptions } from 'nodemailer';
export interface ISendMailOptions extends SendMailOptions {
    to?: string;
    from?: string;
    subject?: string;
    text?: string;
    html?: string;
    template?: string;
    context?: {
        [name: string]: any;
    };
    attachments?: Array<{
        filename: string;
        path?: string;
        cid?: string;
    }>;
}