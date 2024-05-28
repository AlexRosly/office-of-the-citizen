const { Citizen } = require("../models");
const { transporter } = require("../utils");

const createSingInCode = async (req, res) => {
  const { email } = req.body;

  const citizen = await Citizen.findOne({ email });

  if (!citizen) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: "This email does not exist in Users collection",
      })
      .end();
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;

  if (citizen) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    await Citizen.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
  const mail = {
    form: "yourpricebooking@gmail.com",
    to: email,
    subject: "Confirmation code",
    text: "Your Price Booking confirmation code",
    // html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 3 minutes</p>`,
    // amp: `<!doctype html>
    //   <html ⚡4email data-css-strict>
    //   <head>
    //     <meta charset="utf-8">
    //     <script async src="https://cdn.ampproject.org/v0.js"></script>
    //     <style amp4email-boilerplate>body{visibility:hidden}</style>
    //   </head>
    //   <body>
    //           <p>Your confirmation code ${secretCode}.</p>
    //           <p>Attention code valid only 3 minutes</p>
    //   </body>
    //   </html>`,
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>HTML Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600" rel="stylesheet" />
    <style>
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
        }

        [style*="Raleway"] {
            font-family: 'Raleway', arial, sans-serif !important;
        }

        img {
            outline: none;
            text-decoration: none;
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100% !important;
            margin: 0;
            padding: 0;
            display: block;
        }

        table td {
            border-collapse: collapse;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        .logo {
            padding-right: 5px;
        }

        a {
            color: #6c6c6c;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0.28px;
            text-decoration: none;
        }

        .links {
            text-decoration: none;
            color: #4C4C4C;
            font-family: e-Ukraine;
            font-size: 12px;
            font-weight: 400;
            line-height: 14.39px;
            text-align: center;


        }

        .links:hover {
            text-decoration: underline 2px;
            text-decoration-color: #6db2fa;
        }

        td {
            padding-top: 0px;
            padding-bottom: 0px;
        }

        .authorizationheder {
            font-family: Segoe UI;
            font-size: 22px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #6c6c6c;

        }

        .authorization {
            font-family: Segoe UI;
            font-size: 82px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #6c6c6c;
        }

        .authorizationtime {
            font-family: Segoe UI;
            font-size: 22px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #6db2fa;
        }
    </style>
</head>

<body style="margin: 0; padding: 0;">
    <div style="font-size:0px;font-color:#ffffff;opacity:0;visibility:hidden;width:0;height:0;display:none;">Тестовое
        письмо</div>
    <table cellpadding="0" cellspacing="0" max-width="100%" bgcolor="#fbfbfb" align="center">
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" max-width="547" height="422" align="center">
                    <tr>
                        <td height="20" max-width="547"></td>
                    </tr>
                    <tr>
                        <td height="52" max-width="547">
                            <table cellpadding="0" cellspacing="0" max-width="310" align="center">
                                <tr>
                                    <td class="logo" align="left" height="48" max-width="12">
                                        <img src="https://i.ibb.co/rG1wSjv/logo2.jpg" alt="logo" />
                                    </td>
                                    <td class="logo" align="left" height="52" max-width="292">
                                        <img src="https://i.ibb.co/D1wbPxH/logo1.jpg" alt="logo" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="189" max-width="407">
                            <table cellpadding="0" cellspacing="0" height="189" max-width="407" align="center">
                                <tr>
                                    <td class="authorizationheder" align="center" height="48" max-width="12">
                                        Перевірочний код
                                    </td>
                                </tr>
                                <tr>
                                    <td class="authorization" align="center" height="48" max-width="12">
                                        ${secretCode}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="authorizationtime" align="center" height="48" max-width="12">
                                        Перевірочний код діє 3 хвилини
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="130" max-width="407">
                            <table cellpadding="0" cellspacing="0" max-width="407" align="center">
                                <tr>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank"
                                            href="https://www.support@24serpnya.com.ua">Підтримка користувачів</a>
                                    </td>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank" href="https://www.youtube.com/@24serpnya">Ми на
                                            You Tube</a>
                                    </td>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank" href="https://x.com/KabinetU60914">Ми в X</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank"
                                            href="https://www.instagram.com/kabinet_gromadyanina">Ми в Instagram</a>
                                    </td>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank"
                                            href="https://tiktok.com/@kabinet_gromadyanina">Ми в Tik Tok</a>
                                    </td>
                                    <td class="logo" align="center" height="48" max-width="12">
                                        <a class="links" target="_blank"
                                            href="https://t.me/kabinet_gromadyanina_Ukraini">Чат в telegram</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" max-width="547"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
  };
  transporter
    .sendMail(mail)
    .then(() =>
      res
        .json({
          status: "success",
          message: `Confirmation code sent to email: ${email}`,
        })
        .end()
    )
    .catch((error) => console.log(error.message));
};

module.exports = createSingInCode;
