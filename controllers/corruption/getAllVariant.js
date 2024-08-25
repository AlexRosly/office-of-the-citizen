const { CorruptionVariants } = require("../../models");

const getAllVariant = async (req, res) => {
  try {
    const result = await CorruptionVariants.find();

    if (result.length === 0) {
      return res
        .status(404)
        .json({
          code: 404,
          message: "DB doesn't has any variants",
        })
        .end();
    }

    res.status(200).json({ status: "success", code: 200, result }).end();
  } catch (error) {
    console.log("Errror in getAllVariant controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = getAllVariant;
