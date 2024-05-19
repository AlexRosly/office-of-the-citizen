const express = require("express");
const { citizen: ctrl } = require("../controllers");
const {
  ctrlWrapper,
  createRegistrationCode,
  createSingInCode,
  authCitizen,
} = require("../middelwares");
const router = express.Router();

//get all post
// router.get("/get-all", ctrlWrapper(ctrl.getAll));

//logOut
router.get("/log-out", authCitizen, ctrlWrapper(ctrl.logOut));

//get secret code
router.post("/get-secret-code", ctrlWrapper(createRegistrationCode));

//create code and send to email for sign in
router.patch(
  "/check-citizen",
  //   validation(joiGetCodeSchema),
  ctrlWrapper(createSingInCode)
);

//sign in
router.patch(
  "/citizen-sign-in",
  //   validation(joiSignInSchema),
  ctrlWrapper(ctrl.singIn)
);

//create new citizen
router.post("/create-new-citizen", ctrlWrapper(ctrl.createNewCitizen));

module.exports = router;
