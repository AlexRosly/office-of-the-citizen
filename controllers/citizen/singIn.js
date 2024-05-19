const { Citizen } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;
  //find citizen in DB
  const citizen = await Citizen.findOne({ email });
  //get date
  const date = new Date();
  // const { id, firstName, lastName, language, role, createdAt } = hotelier;
  const { id } = citizen;

  //parse number from string into number
  const getCode = Number.parseInt(secretCode);

  //if hotelier don't find return response
  if (!citizen) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `Email ${email} not found`,
      })
      .end();
  }
  //if fornt send wrong secret code
  if (getCode !== citizen.secretCode) {
    return res
      .status(435)
      .json({
        status: "error",
        code: 435,
        message: "Code is wrong",
      })
      .end();
  }
  //if time is up for secret code return response
  if (citizen.validCode < date) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: "Code is invalid",
      })
      .end();
  }
  //create token and write in DB
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  const result = await Citizen.findByIdAndUpdate(id, { token }, { new: true });
  // if all ok return response
  res
    .json({
      status: "success",
      code: 200,
      result: {
        firstName: result.firstName,
        lastName: result.lastName,
        middleName: result.middleName,
        email: result.email,
        token: result.token,
      },
    })
    .end();
};

module.exports = signIn;
