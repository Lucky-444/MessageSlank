import nodemailer from 'nodemailer';

import { MAIL_ID, MAIL_PASSWORD } from './serverConfig.js';

export default nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Must be false for port 587
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD
  }
});

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.MAIL_ID,
//     pass: process.env.MAIL_PASSWORD
//   }
// });
