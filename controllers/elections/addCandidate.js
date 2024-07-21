const { PresidentСandidates } = require("../../models");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs").promises;

const addCandidate = async (req, res) => {
  const { id } = req.citizen;
  const { path } = req.file;
  const { name } = req.body;

  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "Office-Of-The-Citizen/candidates");

    const result = await PresidentСandidates.create({
      name,
      candidateAddedBy: id,
      photo: await uploader(path),
    });

    //if candidate doesn't created return reponse
    if (!result) {
      //delete photo
      await fs.unlink(path);
      return res
        .status(404)
        .json({
          code: 404,
          message: "candidate don't created",
        })
        .end();
    }
    //delete photo
    await fs.unlink(path);
    //retunr response
    res.status(201).json({ status: "success", code: 201, result }).end();
  } catch (error) {
    console.log("Errror in addCandidate controller:", error.message);
    res.status(500).json({ error: "internal server error" }).end();
  }
};

module.exports = addCandidate;
