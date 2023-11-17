import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL_SENDER,
    pass: process.env.NODEMAILER_PASSWORD_SENDER,
  },
});

transporter
  .verify()
  .then(() => {
    console.log('Ready for send emails');
  })
  .catch((error) => {
    console.log(error);
  });
