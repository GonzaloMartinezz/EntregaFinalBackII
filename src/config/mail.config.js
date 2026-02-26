const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAIL_USER, // Tu Gmail
        pass: process.env.MAIL_PASS  // Tu "App Password" de Google
    }
});

module.exports = transport;