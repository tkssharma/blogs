const mongoose = require("mongoose");

const Tutorial = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    images: [],
    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
      }
    ]
  })
);

module.exports = Tutorial;