const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
    },
});

