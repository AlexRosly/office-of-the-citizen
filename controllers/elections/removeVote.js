const { PresidentСandidates, Voising } = require("../../models");

const removeVote = async (req, res) => {
  const { id } = req.citizen; // get citizen id

  try {
    //find id of candidate
    const [findCandidateId] = await Voising.find({ citizen: id });
    //find citizen voice
    const findVoice = await Voising.deleteOne({ citizen: id });
    //if voice doen't remove return response
    if (!findVoice) {
      return res
        .status(404)
        .json({
          status: "error",
          code: 404,
          message: "Voice doesn't remove",
        })
        .end();
    }
    //get candidate id
    const candidateId = findCandidateId.candidate;
    //find amount voited
    const allVoice = await Voising.find();
    const amountCitizenVoice = allVoice.length;
    //find candidate
    const [voice] = await PresidentСandidates.find({
      _id: candidateId,
    });
    //get amount of voice
    const amountVoice = Number(voice.voice - 1);
    console.log({ amountVoice });
    //find percent of voited
    if (amountVoice === 0 || amountCitizenVoice === 0) {
      const result = await PresidentСandidates.findByIdAndUpdate(
        { _id: candidateId },
        { voice: 0, percent: 0 },
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
  } catch (error) {
    console.log("Errror in removeVote controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = removeVote;
