const { Apllication } = require("../../models");

const getCitizenApplication = async (req, res) => {
  const { id } = req.citizen;

  const result = await Apllication.find({ citizen: id });

  if (result.length === 0) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: `citizen doesn't has any applications`,
      })
      .end();
  }

  res
    .json({
      status: "success",
      code: 200,
      result,
    })
    .end();
};

module.exports = getCitizenApplication;
