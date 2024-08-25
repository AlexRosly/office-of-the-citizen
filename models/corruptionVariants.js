const { Schema, model } = require("mongoose");

const corruptionVariantsSchema = Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    variantAddedBy: {
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

const CorruptionVariants = model(
  "corruptionVariants",
  corruptionVariantsSchema
);

module.exports = CorruptionVariants;
