const { Apllication } = require("../../models");
const { checkApplication } = require("../../middelwares");

const houseConstruction = async (req, res) => {
  const { fixed, state } = req.body;
  const { id } = req.citizen;

  const checkCitizenApp = await checkApplication(id);

  if (checkCitizenApp.length > 0) {
    const { _id } = checkCitizenApp[0];
    const updateApp = await Apllication.findByIdAndUpdate(
      _id,
      { houseConstruction: { fixed, state } },
      { new: true }
    );

    if (!updateApp) {
      return res
        .status(436)
        .json({
          status: "error",
          code: 436,
          message: "The application was not accepted",
        })
        .end();
    }
    res
      .json({
        status: "success",
        code: 200,
        houseConstruction: updateApp.houseConstruction,
      })
      .end();
  } else {
    const createApp = await Apllication.create({
      citizen: id,
      houseConstruction: { fixed, state },
    });

    if (!createApp) {
      return res
        .status(436)
        .json({
          status: "error",
          code: 436,
          message: "The application was not accepted",
        })
        .end();
    }
    res
      .json({
        status: "success",
        code: 200,
        houseConstruction: createApp.houseConstruction,
      })
      .end();
  }
};

module.exports = houseConstruction;
