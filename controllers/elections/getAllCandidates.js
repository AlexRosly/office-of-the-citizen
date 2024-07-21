const { PresidentСandidates } = require("../../models");

const getAllCandidates = async (_, res) => {
  try {
    const result = await PresidentСandidates.find();

    if (result.length === 0) {
      return res
        .status(404)
        .json({
          code: 404,
          message: "DB doesn't has any candidates",
        })
        .end();
    }

    res.status(200).json({ status: "success", code: 200, result }).end();
  } catch (error) {
    console.log("Errror in getAllCandidates controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = getAllCandidates;
