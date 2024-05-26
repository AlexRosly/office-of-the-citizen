const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const redirect_uri = "https://developers.google.com/oauthplayground";
const EMAIL = "24serpnya.com.ua@gmail.com";

const OAuth2Client = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirect_uri,
});

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const ACCESS_TOKEN = OAuth2Client.getAccessToken();
const nodemailerConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL,
    clientId,
    clientSecret,
    refreshToken: REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN,
  },
  tls: { rejectUnauthorized: true },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

module.exports = transporter;
