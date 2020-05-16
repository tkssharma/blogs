const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date
  })
);

module.exports = Feedback;