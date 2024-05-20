const express = require("express");
const { applications: ctrl } = require("../controllers");
const { ctrlWrapper, authCitizen } = require("../middelwares");
const router = express.Router();

// add application for house construction
router.post(
  "/application-for-house-construction",
  authCitizen,
  ctrlWrapper(ctrl.houseConstruction)
);

// add application for cottage construction
router.post(
  "/application-for-cottage-construction",
  authCitizen,
  ctrlWrapper(ctrl.cottageConstruction)
);

// add application for garage construction
router.post(
  "/application-for-garage-construction",
  authCitizen,
  ctrlWrapper(ctrl.garageConstruction)
);

// add application for gardening
router.post(
  "/application-for-land-for-gardening",
  authCitizen,
  ctrlWrapper(ctrl.landForGardening)
);

// add application for farming
router.post(
  "/application-for-land-for-farming",
  authCitizen,
  ctrlWrapper(ctrl.landForFarming)
);

// add application for partIncome
router.post(
  "/application-for-part-income",
  authCitizen,
  ctrlWrapper(ctrl.partIncome)
);

// add application for consularServicesAbroad
router.post(
  "/application-for-consular-services-abroad",
  authCitizen,
  ctrlWrapper(ctrl.consularServicesAbroad)
);

// add application for withdrawalFromCitizenship
router.post(
  "/application-for-withdrawal-from-citizenship",
  authCitizen,
  ctrlWrapper(ctrl.withdrawalFromCitizenship)
);

// add application for goAbroad
router.post(
  "/application-for-go-abroad",
  authCitizen,
  ctrlWrapper(ctrl.goAbroad)
);

module.exports = router;
