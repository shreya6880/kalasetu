const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  skillsOffered: {
    type: [String],
    default: []
  },

  skillsWanted: {
    type: [String],
    default: []
  }

});

module.exports = mongoose.model("User", userSchema);