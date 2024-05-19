const { Citizen, Candidate } = require("../models");
const { Conflict } = require("http-errors");
const { transporter } = require("../utils");

const createRegistrationCode = async (req, res) => {
  const { firstName, lastName, middleName, email } = req.body;

  const citizenCandidat = await Citizen.findOne({ email });

  if (citizenCandidat) {
    return res.status(432).json({
      status: "error",
      code: 432,
      message: `This email ${email} is already existed in Citizen collection`,
    });
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;

  const mail = {
    form: "noreply@yourpricebooking.com",
    to: email,
    subject: "Confirmation code",
    text: "Office of the Citizen confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 3 minutes</p>`,
    amp: `<!doctype html>
      <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
      </head>
      <body>
              <p>Your confirmation code ${secretCode}.</p>
              <p>Attention code valid only 3 minutes</p>
      </body>
      </html>`,
  };
  console.log("work");
  console.log({ email });
  const findCandidate = await Candidate.find({ email });
  console.log({ findCandidate });
  console.log("work1");

  if (findCandidate) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    await Candidate.findOneAndUpdate(filter, update, {
      new: true,
    });

    transporter
      .sendMail(mail)
      .then(() =>
        res.json({
          status: "success",
          message: `Confirmation code sent to ${email}`,
        })
      )
      .catch((error) => console.log(error.message));
  } else {
    await Candidate.create({
      email,
      lastName,
      firstName,
      middleName,
      secretCode,
      createdCode,
      validCode,
    });

    transporter
      .sendMail(mail)
      .then(() =>
        res.json({
          status: "success",
          message: `Confirmation code sent to ${email}`,
        })
      )
      .catch((error) => console.log(error.message));
  }
};

module.exports = createRegistrationCode;
