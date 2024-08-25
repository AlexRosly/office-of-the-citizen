const { CorruptionVariants, CorruptionVoising } = require("../../models");

const removeVoteForVariant = async (req, res) => {
  const { id } = req.citizen; // get citizen id

  try {
    // check citizen for vote
    const checkVoise = await CorruptionVoising.find({ citizen: id });
    //if citizen already remove vote, return response
    if (checkVoise.length === 0) {
      return res
        .status(404)
        .json({ code: 404, message: "You have already remove vote" })
        .end();
    }
    //find id of candidate
    const [findVariantId] = await CorruptionVoising.find({ citizen: id });
    if (!findVariantId) {
      return res
        .status(404)
        .json({
          status: "error",
          code: 404,
          message: "DB doesn't has vote",
        })
        .end();
    }
    //find citizen voice
    const removeVoice = await CorruptionVoising.deleteOne({ citizen: id });
    //if voice doen't remove return response
    if (!removeVoice) {
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
    const variantId = JSON.parse(JSON.stringify(findVariantId.variant));
    //find amount voited
    const amountCitizenVoice = await CorruptionVoising.find().count();
    if (amountCitizenVoice.length === 0) {
      return res
        .status(404)
        .json({
          status: "error",
          code: 404,
          message: "DB doesn't has any vote yet",
        })
        .end();
    }
    //find all candidate
    const allVariant = await CorruptionVariants.find();
    //find choising candidate and update
    const findVariant = allVariant.find((el) => el.id === variantId);
    if (findVariant) {
      //get amount of voice
      const amountVoice = findVariant.voice - 1;
      //find percent of voited
      const getPersent = ((amountVoice / amountCitizenVoice) * 100).toFixed(2);
      //update candidate data
      await CorruptionVariants.findByIdAndUpdate(
        { _id: variantId },
        { voice: amountVoice, percent: getPersent > 0 ? getPersent : 0 },
        { new: true }
      );
    }
    //response
    const response = async () => {
      const result = await CorruptionVariants.find();
      // response
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
    //function for update other candidate
    const updateOtherCandidates = (
      allVariant,
      variantId,
      amountCitizenVoice
    ) => {
      allVariant.forEach(async (el) => {
        if (el.id !== variantId) {
          const getPersent = ((el.voice / amountCitizenVoice) * 100).toFixed(2);
          await CorruptionVariants.findByIdAndUpdate(
            { _id: el.id },
            {
              percent: getPersent > 0 ? getPersent : 0,
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
  } catch (error) {
    console.log("Errror in removeVoteForVariant controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = removeVoteForVariant;
