const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASS } = process.env;

const nodemailerConfig = {
  //variant 1 for gmail

  // service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "yourpricebooking@gmail.com", // from send email
    pass: NODEMAILER_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

module.exports = transporter;
