const { Book } = require('../models');
const { Tag } = require('../models');

module.exports = {
  async getAllBooks(req, res, next) {
    try {
      const books = await Book.find().populate('author').populate('tag');
      res.send(books);
    } catch (err) {
      next(err);
    }
  },
  async createBook(req, res, next) {
    try {
      const book = req.body;
      if (!ObjectID.isValid(book.author)) {
        throw new Error('author object id not passed');
      }
      const newBook = await Book.create(book);
      res.send(newBook);
    } catch (err) {
      next(err);
    }
  },
  async AddTagToBook(req, res, next) {
    try {
      const { bookId, TagId } = req.params;
      const newBook =  await Book.findByIdAndUpdate(
        bookId,
        { $push: { tags: TagId } },
        { new: true, useFindAndModify: false },
      );
      res.send(newBook);
    } catch (err) {
      next(err);
    }
  },
  async CreateBookAndAddToTag(req, res, next) {
    try {
      const { tagId } = req.params;
      const book  = req.body;
      const newBook = await Book.create(book);
      const newTag = await Tag.findByIdAndUpdate(
        tagId,
        { $push: { books: newBook._id } },
        { new: true, useFindAndModify: false },
      );
      res.send(newTag);
    } catch (err) {
      next(err);
    }
  },
};
