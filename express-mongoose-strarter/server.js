const dotenv = require('dotenv');
dotenv.config();
const express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
	cors = require('cors'),
	app = express();

require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

require('./server/routes')(app);

app.use(((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const msg = Object.keys(err.errors).map(field => err.errors[field].message);
    return next(new Error(msg[0], 400));
  }
  return next(err);
}));

app.use((req, res, next) => {
  next(new Error('Not Found', 404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
    stack: process.env.ENV === 'development' ? err.stack : {},
  });
});

app.listen(process.env.PORT, function(){
  console.log('Server listening on port ' + process.env.PORT)
});
