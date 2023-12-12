const nodemailer = require("nodemailer");

async function createTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
    tls: { rejectUnauthorized: true },
  });

  return transporter;
}

module.exports = createTransporter;
