const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

  senderEmail: {
    type: String,
    required: true
  },

  receiverEmail: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  }

});

module.exports = mongoose.model(
  "Request",
  requestSchema
);