const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const candidateSchema = Schema(
  {
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    secretCode: {
      type: Number,
      required: true,
    },
    createdCode: {
      type: Number,
      required: true,
    },
    validCode: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// const joiSchema = Joi.object({
//   lastName: Joi.string().required(),
//   firstName: Joi.string().required(),
//   middleName: Joi.string().required(),
//   email: Joi.string().required(),
// });

const Candidate = model("candidate", candidateSchema);

module.exports = Candidate;
// joiSchema,
