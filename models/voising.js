const { Schema, model } = require("mongoose");

const voisingSchema = Schema(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "presidentСandidate",
      requred: true,
    },
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "citizen",
      requred: true,
    },
    voice: {
      type: Number,
      default: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

const Voising = model("voising", voisingSchema);

module.exports = Voising;
