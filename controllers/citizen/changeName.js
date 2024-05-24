const { Citizen } = require("../../models");

const changeName = async (req, res) => {
  const { firstName, lastName, middleName } = req.body;
  const { id } = req.citizen;

  const changeData = await Citizen.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      middleName,
    },
    { new: true }
  );

  if (changeData.length === 0) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: "citizen data is not updated",
      })
      .end();
  }

  res
    .status(200)
    .json({
      status: "success",
      code: 200,
      result: {
        firstName: changeData.firstName,
        middleName: changeData.middleName,
        lastName: changeData.lastName,
      },
    })
    .end();
};

module.exports = changeName;
