const mongoose = require("mongoose");

const Customer = mongoose.Schema({
    customername: String,
    location: String,
    address: String
  });

module.exports = mongoose.model('Customer', Customer);
