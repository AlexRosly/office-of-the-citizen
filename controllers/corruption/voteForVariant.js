const { CorruptionVariants, CorruptionVoising } = require("../../models");

const voteForVariant = async (req, res) => {
  const { id } = req.citizen; // get citizen id
  const { variantId } = req.query; // get candidate id for vote

  try {
    //check citizen for vote
    const checkVoise = await CorruptionVoising.find({ citizen: id });
    //if citizen already vote, return response
    if (checkVoise.length > 0) {
      return res
        .status(404)
        .json({ code: 404, message: "You have already voted" })
        .end();
    }
    //write citizen vote in DB
    const createVoise = await CorruptionVoising.create({
      citizen: id,
      variant: variantId,
    });
    //if citizen vote write in DB, return response
    if (createVoise) {
      //find amount voited
      const amountCitizenVoice = await CorruptionVoising.find().count();
      //find all candidate
      const allVariant = await CorruptionVariants.find();
      //find choising candidate and update
      const findCandidate = allVariant.find((el) => el.id === variantId);
      if (findCandidate) {
        //get amount of voice
        const amountVoice = findCandidate.voice + 1;
        //find percent of voited
        const getPersent = ((amountVoice / amountCitizenVoice) * 100).toFixed(
          2
        );
        //update candidate data
        await CorruptionVariants.findByIdAndUpdate(
          { _id: variantId },
          { voice: amountVoice, percent: getPersent },
          { new: true }
        );
      }
      // response
      const response = async () => {
        const result = await CorruptionVariants.find();
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
        allVariant,
        variantId,
        amountCitizenVoice
      ) => {
        allVariant.forEach(async (el) => {
          if (el.id !== variantId) {
            const getPersent = ((el.voice / amountCitizenVoice) * 100).toFixed(
              2
            );
            await CorruptionVariants.findByIdAndUpdate(
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
      updateOtherCandidates(allVariant, variantId, amountCitizenVoice);
    }
  } catch (error) {
    console.log("Errror in voteForVariant controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = voteForVariant;
