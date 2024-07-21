const { Apllication, Voising } = require("../../models");

const getAppStatistic = async () => {
  const houseConstruction = await Apllication.find({
    "houseConstruction.fixed": true,
  }).count();
  const cottageConstruction = await Apllication.find({
    "cottageConstruction.fixed": true,
  }).count();
  const garageConstruction = await Apllication.find({
    "garageConstruction.fixed": true,
  }).count();
  const landForGardening = await Apllication.find({
    "landForGardening.fixed": true,
  }).count();
  const landForFarming = await Apllication.find({
    "landForFarming.fixed": true,
  }).count();
  const partIncome = await Apllication.find({
    "partIncome.fixed": true,
  }).count();
  const consularServicesAbroad = await Apllication.find({
    "consularServicesAbroad.fixed": true,
  }).count();
  const withdrawalFromCitizenship = await Apllication.find({
    "withdrawalFromCitizenship.fixed": true,
  }).count();
  const goAbroad = await Apllication.find({
    "goAbroad.fixed": true,
  }).count();

  const vote = await Voising.find();

  let result = {
    houseConstruction,
    cottageConstruction,
    garageConstruction,
    landForGardening,
    landForFarming,
    partIncome,
    consularServicesAbroad,
    withdrawalFromCitizenship,
    goAbroad,
    // vote,
  };

  return result;
};

module.exports = getAppStatistic;
