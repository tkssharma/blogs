const mongoose = require("mongoose");

const Tag = mongoose.Schema({
    name: String,
    description: String,
    slug: String,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
      }
    ]
  });

module.exports = mongoose.model('Tag', Tag);
