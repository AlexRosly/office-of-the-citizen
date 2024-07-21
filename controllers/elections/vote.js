const { PresidentСandidates, Voising } = require("../../models");

const vote = async (req, res) => {
  const { id } = req.citizen; // get citizen id
  const { candidateId } = req.query; // get candidate id for vote
  try {
    //check citizen for vote
    const checkVoise = await Voising.find({ citizen: id });
    //if citizen already vote, return response
    if (checkVoise.length > 0) {
      return res
        .status(404)
        .json({ code: 404, message: "You have already voted" })
        .end();
    }
    //write citizen vote in DB
    const createVoise = await Voising.create({
      citizen: id,
      candidate: candidateId,
    });
    //if citizen vot write in DB, return response
    if (createVoise) {
      //find amount voited
      const allVoice = await Voising.find();
      const amountCitizenVoice = allVoice.length;
      //find candidate
      const [voice] = await PresidentСandidates.find({
        _id: candidateId,
      });
      //get amount of voice
      const amountVoice = Number(voice.voice + 1);
      //find percent of voited
      const getPersent = ((amountVoice / amountCitizenVoice) * 100).toFixed(2);
      //update amount of voice and percent
      const result = await PresidentСandidates.findByIdAndUpdate(
        { _id: candidateId },
        { voice: amountVoice, percent: getPersent },
        { new: true }
      );
      //response
      return res
        .status(201)
        .json({
          code: 201,
          status: "success",
          result,
          totalVoice: amountCitizenVoice,
        })
        .end();
    }
  } catch (error) {
    console.log("Errror in vote controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = vote;
