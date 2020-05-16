const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../helpers/AppError');

module.exports = {
async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new AppError('User does not exist', 401));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.json({
          id: user.id,
          token,
        });
      }
      return next(new AppError('Wrong password', 401));
    } catch (err) {
      return next(err);
    }
  },
async register (req, res, next) {
    try {
      const user = await User.create(req.body);
      const token = user.generateToken();
      return res.json({
        id: user.id,
        token,
      });
    } catch (err) {
      return next(err);
    }
  },
async checkAuth  (req, res, next) {
    const token = req.header('authorization');
    if (!token) {
      return next(new AppError('No token provided', 401));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      return res.json({
        id: decoded.user._id,
        token,
      });
    } catch (err) {
      return next(err);
    }
  }
}

