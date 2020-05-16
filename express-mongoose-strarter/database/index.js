const mongoose = require('mongoose');


mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB, { useMongoClient: true, });

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
