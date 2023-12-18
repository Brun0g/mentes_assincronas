const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  tls: { rejectUnauthorized: true },
});

module.exports = transportador;
