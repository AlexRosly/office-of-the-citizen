const { Apllication } = require("../models");

const checkApplication = async (id) => {
  return await Apllication.find({ citizen: id });
};

module.exports = checkApplication;
