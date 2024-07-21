const { Schema, model } = require("mongoose");

const presidentСandidatesSchema = Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    photo: {
      type: String,
    },
    candidateAddedBy: {
      type: Schema.Types.ObjectId,
      ref: "citizen",
      requred: true,
    },
    voice: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const PresidentСandidates = model(
  "presidentСandidate",
  presidentСandidatesSchema
);

module.exports = PresidentСandidates;
