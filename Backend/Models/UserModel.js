const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,      
    },
    password: {
      type: String,
      required: true,
    
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

const User = mongoose.model("User", userSchema);

module.exports = User;
