const { Schema, model } = require("mongoose");

const corruptionVoisingSchema = Schema(
  {
    variant: {
      type: Schema.Types.ObjectId,
      ref: "corruptionVariants",
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

const CorruptionVoising = model("corruptionVoising", corruptionVoisingSchema);

module.exports = CorruptionVoising;
