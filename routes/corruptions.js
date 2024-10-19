const express = require("express");
const { corruption: ctrl } = require("../controllers");
const { ctrlWrapper, authCitizen } = require("../middelwares");
const router = express.Router();

// add variant
router.post("/add-variant", authCitizen, ctrlWrapper(ctrl.addVariant));

//
router.get("/get-all-variant", ctrlWrapper(ctrl.getAllVariant));

router.post("/vote-for-variant", authCitizen, ctrlWrapper(ctrl.voteForVariant));

router.delete(
  "/remove-vote-for-variant",
  authCitizen,
  ctrlWrapper(ctrl.removeVoteForVariant)
);

module.exports = router;
