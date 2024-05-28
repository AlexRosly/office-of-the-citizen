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
    html: `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            display: flex;
            max-width: 1200px;
            margin: 0px auto;
        }

        .content {
            display: flex;
            width: 90%;
            height: 422px;
            margin: 0 auto;
            flex-direction: column;
            align-items: center;
        }

        .cod_fild {
            display: flex;
            margin-top: 100px;
            height: 204px;
            flex-direction: column;
            align-content: center;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .cod {
            font-family: Segoe UI;
            font-size: 85px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #656363;
        }

        .link_fild {
            display: flex;
            flex-direction: row;
            align-content: center;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            margin-top: 20px;
        }

        .h1 {
            font-family: Segoe UI;
            font-size: 22px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #656363;
        }

        .validonly {
            font-family: Segoe UI;
            font-size: 22px;
            font-weight: 700;
            line-height: 29.26px;
            text-align: center;
            color: #6db2fa;
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

        .logo {
            width: 292px;
            height: 52px;
            display: flex;
            flex-direction: row;

        }

        .logo_link {
            height: 52px;
            display: flex;
            flex-direction: row;

        }

        .logo_flag1 {
            width: 13px;
            height: 26px;
            border-radius: 5px 0px 0px 0px;
            background: #0080ff;
            margin-right: 5px;

        }

        .logo_flag2 {
            width: 13px;
            height: 26px;
            background: #ffdd42;
            border-radius: 0px 0px 0px 5px;

        }

        a {
            text-decoration: none;
        }

        .img1 {
            width: 10%;
        }

        .img2 {
            width: 50%;
        }

        @media (max-width: 550px) {
            .link_fild {
                flex-direction: column;
            }

            .logo {
                width: 70%;
            }

            .content {
                height: fit-content;
            }
        }
    </style>
</head>

<body>
    <div class="content">
        <div class="logo">
            <a target="_blank" href="https://www.24serpnya.com.ua/">
                <div>
                    <div class="logo_flag1"></div>
                    <div class="logo_flag2"></div>
                </div>
            </a>
            <a target="_blank" href="https://www.24serpnya.com.ua/" target="_blank" class="logo_link"><img style="width: 100%;"
                    src="./Кабінет Громадянина України.svg" alt=""></a>
        </div>
        <div class="cod_fild">
            <div class="h1">
                Перевірочний код
            </div>
            <div class="cod">${secretCode}</div>
            <div class="validonly">
                Перевірочний код діє 3 хвилини
            </div>
        </div>
        <div class="link_fild">
            <a class="links" target="_blank" href="https://www.support@24serpnya.com.ua">Підтримка користувачів</a>
            <a class="links" target="_blank" href="https://www.youtube.com/@24serpnya">Ми на You Tube</a>
            <a class="links" target="_blank" href="https://x.com/KabinetU60914">Ми в X</a>
        </div>
        <div class="link_fild">
            <a class="links" target="_blank" href="https://www.instagram.com/kabinet_gromadyanina">Ми в Instagram</a>
            <a class="links" target="_blank" href="https://tiktok.com/@kabinet_gromadyanina">Ми в Tik Tok</a>
            <a class="links" target="_blank" href="https://t.me/kabinet_gromadyanina_Ukraini">Чат в telegram</a>
        </div>
    </div>
</body>
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
