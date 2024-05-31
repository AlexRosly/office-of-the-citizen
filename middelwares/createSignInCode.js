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
    form: "24serpnya.com.ua@gmail.com",
    to: email,
    subject: "Confirmation code",
    text: "Office of the Citizen confirmation code",
    html: `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="uk">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600" rel="stylesheet">
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
            margin: auto;
        }

        a {
            text-decoration: none;
            letter-spacing: 0.28px;
            color: #4C4C4C;
            font-size: 12px;
            font-weight: 400;
            font-family: e-Ukraine;
            line-height: 14.39px;
            text-align: center;
            padding-left: 5px;
            padding-right: 5px
        }

        .linc {
            color: #4C4C4C;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.28px;
            text-decoration: none;
            font-family: e-Ukraine;
            line-height: 14.39px;
            text-align: center;
            padding-left: 5px;
            padding-right: 5px
        }
    </style>
</head>

<body
    style="width:100% !important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;line-height:82px">
    <table cellpadding="0" cellspacing="0" max-width="100%" bgcolor="#fbfbfb" align="center" role="presentation"
        style="border-collapse:collapse;margin:auto">
        <tr>
            <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center">
                <table cellpadding="0" cellspacing="0" max-width="547" height="422" align="center" role="presentation"
                    style="border-collapse:collapse;margin:auto">
                    <tr>
                        <td height="20" max-width="547"
                            style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center"></td>
                    </tr>
                    <tr>
                        <td height="52" max-width="547"
                            style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center">
                            <table cellpadding="0" cellspacing="0" max-width="310" align="center" role="presentation"
                                style="border-collapse:collapse;margin:auto">
                                <tr>
                                    <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" height="48" max-width="fit-content"><img
                                            src="https://i.ibb.co/rG1wSjv/logo2.jpg" alt="logo"
                                            style="outline:none;text-decoration:none;border:none;-ms-interpolation-mode:bicubic;max-width:100% !important;margin:0;padding:0;display:block">
                                    </td>
                                    <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" height="52" max-width="292"><img
                                            src="https://i.ibb.co/D1wbPxH/logo1.jpg" alt="logo"
                                            style="outline:none;text-decoration:none;border:none;-ms-interpolation-mode:bicubic;max-width:100% !important;margin:0;padding:0;display:block">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="189" max-width="407"
                            style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center">
                            <table cellpadding="0" cellspacing="0" height="189" max-width="407" align="center"
                                role="presentation" style="border-collapse:collapse;margin:auto">
                                <tr>
                                    <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;font-family:'Segoe UI';font-size:22px;font-weight:700;line-height:29.26px;color:#6c6c6c"
                                        align="center" height="48" max-width="fit-content">Перевірочний код</td>
                                </tr>
                                <tr>
                                    <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;font-family:'Segoe UI';font-size:82px;font-weight:700;line-height:29.26px;color:#6c6c6c"
                                        align="center" height="48" max-width="fit-content">${secretCode}</td>
                                </tr>
                                <tr>
                                    <td style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;font-family:'Segoe UI';font-size:22px;font-weight:700;line-height:29.26px;color:#6db2fa"
                                        align="center" height="48" max-width="fit-content">Перевірочний код діє 3
                                        хвилини</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="130" max-width="407"
                            style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center">
                            <table
                                style="border-collapse:collapse;margin:auto;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:nowrap"
                                cellpadding="0" cellspacing="0" max-width="407" text-align="center" role="presentation">
                                <tr
                                    style="display:flex;  flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center;">
                                    <td style="
                                        display: block;
                                        max-width: fit-content;
                                        font-size: 12px;
                                        color: #4C4C4C;
                                        font-weight: 400;
                                        letter-spacing: 0.28px;
                                        font-family: e-Ukraine;
                                        text-align: center;
                                        padding-right: 5px">
                                        Підтримка користувачів
                                    </td>
                                    <td style="
                                        display: block;
                                        max-width: fit-content;
                                        font-size: 12px;
                                        color: #4C4C4C;
                                        font-weight: 400;
                                        letter-spacing: 0.28px;
                                        font-family: e-Ukraine;
                                        text-align: center;
                                        padding-right: 5px">
                                        support@24serpnya.com.ua
                                    </td>
                                </tr>
                                <tr
                                    style="display:flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center;">
                                    <td style="height: 20px;border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" max-width="fit-content"><a style="
                                        display: block;
                                        text-decoration: none;
                                        letter-spacing: 0.28px;
                                        color: #4C4C4C;
                                        font-size: 12px;
                                        font-weight: 400;
                                        font-family: e-Ukraine;
                                        line-height: 14.39px;
                                        text-align: center;
                                        padding-left: 5px;
                                        padding-right: 5px" target="_blank"
                                            href="https://www.youtube.com/@24serpnya">Ми на You Tube</a>
                                    </td>
                                    <td style="height: 20px;border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" max-width="fit-content"><a style="
                                        display: block;
                                        text-decoration: none;
                                        letter-spacing: 0.28px;
                                        color: #4C4C4C;
                                        font-size: 12px;
                                        font-weight: 400;
                                        font-family: e-Ukraine;
                                        line-height: 14.39px;
                                        text-align: center;
                                        padding-left: 5px;
                                        padding-right: 5px" target="_blank" href="https://x.com/KabinetU60914">Ми в
                                            X</a></td>
                                    <td style="height: 20px;border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" max-width="fit-content"><a style="
                                        display: block;
                                        text-decoration: none;
                                        letter-spacing: 0.28px;
                                        color: #4C4C4C;
                                        font-size: 12px;
                                        font-weight: 400;
                                        font-family: e-Ukraine;
                                        line-height: 14.39px;
                                        text-align: center;
                                        padding-left: 5px;
                                        padding-right: 5px" target="_blank"
                                            href="https://www.instagram.com/kabinet_gromadyanina">Ми в Instagram</a>
                                    </td>
                                    <td style="height: 20px;border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" max-width="fit-content"><a style="
                                        display: block;
                                        text-decoration: none;
                                        letter-spacing: 0.28px;
                                        color: #4C4C4C;
                                        font-size: 12px;
                                        font-weight: 400;
                                        font-family: e-Ukraine;
                                        line-height: 14.39px;
                                        text-align: center;
                                        padding-left: 5px;
                                        padding-right: 5px" target="_blank"
                                            href="https://tiktok.com/@kabinet_gromadyanina">Ми в Tik Tok</a></td>
                                    <td style="height: 20px;border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center;padding-right:5px"
                                        align="center" max-width="fit-content">
                                        <a style="
                                        display: block;
                                        text-decoration: none;
                                        letter-spacing: 0.28px;
                                        color: #4C4C4C;
                                        font-size: 12px;
                                        font-weight: 400;
                                        font-family: e-Ukraine;
                                        line-height: 14.39px;
                                        text-align: center;
                                        padding-left: 5px;
                                        padding-right: 5px" target="_blank"
                                            href="https://t.me/kabinet_gromadyanina_Ukraini">Чат в telegram</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" max-width="547"
                            style="border-collapse:collapse;padding-top:0px;padding-bottom:0px;text-align:center"></td>
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
