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
    //if citizen vote write in DB, return response
    if (createVoise) {
      //find amount voited
      const amountCitizenVoice = await Voising.find().count();
      //find all candidate
      const allCandidate = await PresidentСandidates.find();
      //find choising candidate and update
      const findCandidate = allCandidate.find((el) => el.id === candidateId);
      if (findCandidate) {
        //get amount of voice
        const amountVoice = Number(findCandidate.voice + 1);
        //find percent of voited
        const getPersent = ((amountVoice / amountCitizenVoice) * 100).toFixed(
          2
        );
        //update candidate data
        await PresidentСandidates.findByIdAndUpdate(
          { _id: candidateId },
          { voice: amountVoice, percent: getPersent },
          { new: true }
        );
      }
      // response
      const response = async () => {
        const result = await PresidentСandidates.find();
        return res
          .status(201)
          .json({
            code: 201,
            status: "success",
            result,
            totalVoice: amountCitizenVoice,
          })
          .end();
      };

      const updateOtherCandidates = (
        allCandidate,
        candidateId,
        amountCitizenVoice
      ) => {
        allCandidate.forEach(async (el) => {
          if (el.id !== candidateId) {
            const getPersent = ((el.voice / amountCitizenVoice) * 100).toFixed(
              2
            );
            await PresidentСandidates.findByIdAndUpdate(
              { _id: el.id },
              {
                percent: getPersent,
              },
              { new: true }
            );
          }
        });
        //set timeout for call response
        setTimeout(() => {
          response();
        }, 1500);
      };
      //call function for update other candidate
      updateOtherCandidates(allCandidate, candidateId, amountCitizenVoice);
    }
  } catch (error) {
    console.log("Errror in vote controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = vote;
