const { Apllication } = require("../../models");
const { checkApplication } = require("../../middelwares");
const { io } = require("../../socket/socket");
const getAppStatistic = require("./getAppStatistic");

const goAbroad = async (req, res) => {
  const { fixed } = req.body;
  //get id from citizen token
  const { id } = req.citizen;
  //check DB to earli citizen app
  const checkCitizenApp = await checkApplication(id);
  //variables for send amount applications by socket
  let amount;
  //if DB has citizes app update
  if (checkCitizenApp.length > 0) {
    const { _id } = checkCitizenApp[0];
    const updateApp = await Apllication.findByIdAndUpdate(
      _id,
      { goAbroad: { fixed } },
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
    //get amount and send
    amount = await getAppStatistic();
    io.emit("amount", { amount });
    res
      .json({
        status: "success",
        code: 200,
        goAbroad: updateApp.goAbroad,
      })
      .end();
  } else {
    //if DB hasn't citizen app create new app
    const createApp = await Apllication.create({
      citizen: id,
      goAbroad: { fixed },
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
    //get amount and send
    amount = await getAppStatistic();
    io.emit("amount", { amount });
    res
      .json({
        status: "success",
        code: 200,
        goAbroad: createApp.goAbroad,
      })
      .end();
  }
};

module.exports = goAbroad;
