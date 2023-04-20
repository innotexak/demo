
import crypto from 'crypto'
import jwt from "jsonwebtoken";
import {
    HOST_EMAIL, isDev,
    SECRET_KEY,
} from "./config/config.js";
import { GraphQLError } from "graphql";
import ejs from 'ejs'
import * as path from 'path'

import nodemailer from 'nodemailer'
import * as fs from "fs";
import { model } from 'mongoose';




enum templateName {
    welcome = "welcome",
    activation = "activation",
    invoice = "invoice",
    resetPassword = "resetPassword",
    updatePassword = "updatePassword",
}

interface ApiKeys {
    publicKey: string;
    secretKey: string;
    testPublicKey: string;
    testSecretKey: string;
}

export default class Base {
    templateName = templateName;

    async jwtSign(userId: string) {
        return jwt.sign(
            { userId: userId },
            SECRET_KEY,
            { expiresIn: "24h" },
        );

    }

    jwtDecode(token: string) {
        return new Promise((resolve, reject) => {
            if (!token) {
                return resolve(undefined)

            }
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    // console.log(token)
                    return resolve(undefined)
                }
                resolve(decoded)
            });

        })
    }

    async checkAuth(user: any) {
        if (!user) {
            throw new GraphQLError('user not verified')

        }
    }


    async generateUniqueApiKeys(): Promise<ApiKeys> {
        let keys: ApiKeys = {
            publicKey: '',
            secretKey: '',
            testPublicKey: '',
            testSecretKey: '',
        };

        keys = {
            publicKey: `NA_PUB_PROD-${crypto.randomBytes(16).toString('hex')}`,
            secretKey: `NA_SEC_PROD-${crypto.randomBytes(16).toString('hex')}`,
            testPublicKey: `NA_PUB_TEST-${crypto.randomBytes(16).toString('hex')}`,
            testSecretKey: `NA_SEC_TEST-${crypto.randomBytes(16).toString('hex')}`,
        };

        return keys;
    }

    getTemplate(templateName: templateName, data: object) {
        const selection = {
            welcome: templateName === "welcome" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'welcome.ejs')).toString(),
        }
        const template = ejs.compile((selection[templateName]), {})
        return template(data)
    }

    async sendTestEmail(options) {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const mailOptions = {
            to: options,
            from: HOST_EMAIL,
            subject: options.subject,
            html: options.message
        };

        const res = await transporter.sendMail(mailOptions as object)
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(res));
    }

    async sendEmail(options, resetPassword: string, resetPassword1: templateName.resetPassword, p: { message: string; url: string }) {
        if (isDev) {
            return this.sendTestEmail(options)
        }
        const transporter = nodemailer.createTransport({

        });

        const mailOptions = {
            to: options.email,
            from: HOST_EMAIL,
            subject: options.subject,
            html: options.message
        };

        await transporter.sendMail(mailOptions as object)
    }

    // mailMessageForProfileUpdate(data: { email: string, password: string }) {
    //     return `
    // 	  <b style="font-size: 10px">Note: These Credentials will be used for both the mobile App and email account</b>
    // 			<b style="font-size: 10px">Account Credentials </b>
    // 			 <ul>
    // 				 <li>Email: ${data.email}</li>
    // 				 <li>password: ${data.password}</li>
    // 			</ul>
    // 		<b>SMTP Config</b>
    // 			<ul>
    // 				 <li>
    // 				 host: ${SMPT_HOST}
    // 				 </li>
    // 			 <li>port: ${SMPT_PORT}</li>
    // 			</ul>
    // 		<b>IMAP Config</b>
    // 			<ul>
    // 				 <li>host: ${SMPT_HOST}</li>
    // 				 <li>port: 465</li>
    // 			</ul>
    // 	`
    // }
}

// export default hashPassword
