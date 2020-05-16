const mongoose = require("mongoose");

const Tutorial = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    images: []
  })
);

module.exports = Tutorial;