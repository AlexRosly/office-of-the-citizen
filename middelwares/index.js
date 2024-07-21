const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const createRegistrationCode = require("./createRegistrationCode");
const createSingInCode = require("./createSignInCode");
const authCitizen = require("./authCitizen");
const checkApplication = require("./checkApplication");
const upload = require("./upload");

module.exports = {
  validation,
  ctrlWrapper,
  createRegistrationCode,
  createSingInCode,
  authCitizen,
  checkApplication,
  upload,
};
