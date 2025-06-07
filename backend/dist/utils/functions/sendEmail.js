"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
exports.sendEmail = sendEmail;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
exports.template = {
    verify: (code) => `
    <h1>Verification code: ${code}</h1>`
};
async function sendEmail(to, subject, text) {
    if (!to || !subject || !text) {
        throw new common_1.BadRequestException({ code: 400, message: 'Email, subject and text are required' });
    }
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to,
        subject,
        html: text
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully', info);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}
//# sourceMappingURL=sendEmail.js.map