const { Citizen, Apllication } = require("../../models");

const removeCitizen = async (req, res) => {
  const { id } = req.citizen;
  const removeCitizenApp = await Apllication.deleteOne({ citizen: id });

  if (!removeCitizenApp) {
    return res
      .status(404)
      .json({
        status: "error",
        code: 404,
        message: "Citizen App doesn't remove, try later",
      })
      .end();
  }

  const removeCitizen = await Citizen.deleteOne({ _id: id });

  if (!removeCitizen) {
    return res
      .status(435)
      .json({
        status: "error",
        code: 435,
        message: "Citizen account doesn't remove, try later",
      })
      .end();
  }

  res
    .json({
      status: "success",
      code: 204,
      message: "Citizen account and application has been removed",
    })
    .end();
};

module.exports = removeCitizen;
