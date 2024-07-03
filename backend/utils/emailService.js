import nodemailer from 'nodemailer';
import config from '../config.js';

// SMTP 
const smtpConfig = {
    host: config.smtpHost,
    port: config.smtpPort,
    secure: true,
    requireTLS: true,
    auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
    },
};


const transporter = nodemailer.createTransport(smtpConfig);

const sendEmail = async (to, subject, message) => {
    const mailOptions = {
        from: '"No Reply" <dev@snapurl.in>', // sender address
        to: to, // list of receivers
        subject: subject,
        html: message,
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(`Message sent to : ${response.accepted[0]}`);
    } catch (error) {
        console.error('An SMTP error occurred:', error);
    }
};

export default sendEmail;