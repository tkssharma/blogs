const User = require('../models/user-model');
const { ObjectID } = require('mongodb');

module.exports = {
  async getUser (req, res, next) {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return next();
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return next();
      }
      return res.json(user);
    } catch (err) {
      return next(err);
      }
  },
  async list (req, res, next) {
    try {
      const users = await User.find();
      return res.json({ users });
    } catch (e) {
          return next(e);
      }
  },
  async update (req, res, next) {
    const body = req.body;
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return next();
    }
    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: body,
      }, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return next();
      }
      return res.json(user);
      } catch (err) {
          return next(err);
      }
  }
}
