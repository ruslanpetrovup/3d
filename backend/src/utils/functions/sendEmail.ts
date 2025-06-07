import { BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const dotenv = require('dotenv');
dotenv.config();

export const template = {
    verify: (code: number) => `
    <h1>Verification code: ${code}</h1>`
}

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  if(!to || !subject || !text){
    throw new BadRequestException({code:400,message:'Email, subject and text are required'});
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
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

