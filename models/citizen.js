const { Schema, model } = require("mongoose");

const citizenSchema = Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    email: { type: String },
    secretCode: {
      type: Number,
      required: true,
    },
    createdCode: {
      type: Number,
    },
    validCode: {
      type: Number,
    },
    status: { type: String, default: "registered" },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Citizen = model("citizen", citizenSchema);

module.exports = Citizen;
