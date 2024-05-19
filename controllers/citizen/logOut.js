const { Citizen } = require("../../models");

const logOut = async (req, res) => {
  const { id } = req.citizen;

  await Citizen.findByIdAndUpdate(id, { token: null });

  res
    .json({
      status: "success",
      code: 204,
    })
    .end();
};

module.exports = logOut;
