const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  auth: {
    user: "usarmyunidademilsim@gmail.com",
    pass: "odhw ktok hqvk zztf",
  },
  secure: false,
});

module.exports = transportador;
