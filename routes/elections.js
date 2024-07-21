const express = require("express");
const { elections: ctrl } = require("../controllers");
const { ctrlWrapper, authCitizen, upload } = require("../middelwares");
const router = express.Router();

// add candidate
router.post(
  "/add-candidate",
  authCitizen,
  upload.single("image"),
  ctrlWrapper(ctrl.addCandidate)
);

//
router.get("/get-all-candidates", ctrlWrapper(ctrl.getAllCandidates));

router.post("/vote", authCitizen, ctrlWrapper(ctrl.vote));

router.delete("/remove-vote", authCitizen, ctrlWrapper(ctrl.removeVote));

module.exports = router;
