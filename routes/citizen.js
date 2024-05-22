const express = require("express");
const { citizen: ctrl } = require("../controllers");
const {
  ctrlWrapper,
  createRegistrationCode,
  createSingInCode,
  authCitizen,
} = require("../middelwares");
const router = express.Router();

//logOut
router.get("/log-out", authCitizen, ctrlWrapper(ctrl.logOut));

//get citizen application
router.get(
  "/get-citizen-application",
  authCitizen,
  ctrlWrapper(ctrl.getCitizenApplication)
);

//get secret code
router.post("/get-secret-code", ctrlWrapper(createRegistrationCode));

//create code and send to email for sign in
router.patch("/check-citizen", ctrlWrapper(createSingInCode));

//sign in
router.patch("/citizen-sign-in", ctrlWrapper(ctrl.singIn));

//create new citizen
router.post("/create-new-citizen", ctrlWrapper(ctrl.createNewCitizen));

router.delete("/remove-citizen", authCitizen, ctrlWrapper(ctrl.removeCitizen));

module.exports = router;
