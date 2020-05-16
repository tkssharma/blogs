const { Tag } = require('../models');
const { Book } = require('../models');

module.exports = {
  async getAllTags(req, res, next) {
    try {
      const tags = await Tag.find().populate('book');
      res.send(tags);
    } catch (err) {
      next(err);
    }
  },
  async createTag(req, res, next) {
    try {
      const tag = req.body;
      const newTag = await Tag.create(tag);
      res.send(newTag);
    } catch (err) {
      next(err);
    }
  },
  async AddBookToTag(req, res, next) {
    try {
      const { bookId, TagId } = req.params;
      const newTag =  await Tag.findByIdAndUpdate(
        TagId,
        { $push: { books: bookId } },
        { new: true, useFindAndModify: false },
      );
      res.send(newTag);
    } catch (err) {
      next(err);
    }
  },
  async CreateTagAndAddToBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const tag  = req.body;
      const newTag = await Tag.create(tag);
      const newBook=  await Book.findByIdAndUpdate(
        bookId,
        { $push: { tags: newTag._id } },
        { new: true, useFindAndModify: false },
      );
      res.send(newBook);
    } catch (err) {
      next(err);
    }
  },
};
