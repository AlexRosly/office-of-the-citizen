const { Citizen, Candidate } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const createNewCitizen = async (req, res) => {
  const { firstName, lastName, middleName, email, secretCode } = req.body;
  //parse number from string into number
  const getCode = Number.parseInt(secretCode);
  //find candidate
  const candidate = await Candidate.find({ email });
  //create date for check on valid in time
  const date = new Date();
  //check secret code
  if (getCode !== candidate[0].secretCode) {
    return res
      .status(435)
      .json({
        status: "error",
        code: 435,
        message: "secret code is wrong",
      })
      .end();
  }
  //check valid code. Only 3 minutes valid
  if (candidate[0].validCode < date) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: "secret code is invalid",
      })
      .end();
  }
  //if all check done, create new citizen
  const createCitizen = await Citizen.create({
    firstName,
    lastName,
    middleName,
    email: email.toLowerCase(),
    secretCode: getCode,
  });
  //remove candidate from DB
  await Candidate.findOneAndRemove({ email });
  //get id for token
  const { id } = createCitizen;

  const payload = {
    id,
  };
  //create token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  //update citizen and write token
  const result = await Citizen.findByIdAndUpdate(id, { token }, { new: true });
  //return response
  res
    .status(201)
    .json({
      status: "success",
      code: 201,
      result,
    })
    .end();
};

module.exports = createNewCitizen;
