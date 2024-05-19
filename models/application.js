const { Schema, model } = require("mongoose");

const applicationSchema = Schema(
  {
    houseConstruction: {
      fixed: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
      },
    },
    cottageConstruction: {
      fixed: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
      },
    },
    garageConstruction: {
      fixed: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
      },
    },
    landForGardening: {
      fixed: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
      },
    },
    landForFarming: {
      fixed: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
      },
    },
    partIncome: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },
    consularServicesAbroad: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },
    withdrawalFromCitizenship: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },
    goAbroad: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },

    citizen: {
      type: Schema.Types.ObjectId,
      ref: "citizen",
      requred: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Apllication = model("applications", applicationSchema);

module.exports = Apllication;
