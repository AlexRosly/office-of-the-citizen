const { CorruptionVariants } = require("../../models");

const addVariant = async (req, res) => {
  const { id } = req.citizen;
  const { name } = req.body;

  try {
    const result = await CorruptionVariants.create({
      name,
      variantAddedBy: id,
    });

    if (!result) {
      return res
        .status(404)
        .json({
          code: 404,
          message: "variant don't created",
        })
        .end();
    }

    res.status(201).json({ status: "success", code: 201, result }).end();
  } catch (error) {
    console.log("Errror in addVariant controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = addVariant;
