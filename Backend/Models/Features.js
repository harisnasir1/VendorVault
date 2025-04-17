const mongoose = require("mongoose");


const FeatureSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    labels: [
      {
        labelname: {
          type: String,
          required: true,
        },
        labelcol: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Features = mongoose.model("Features", FeatureSchema);
module.exports = Features;
