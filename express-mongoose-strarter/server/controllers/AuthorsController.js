const { Author } = require('../models');

const AuthorsController = {
  async getAllAuthors(req, res, next){
    try {
  	const authors = await Author.find().populate('books');
    res.send(authors);
    }catch(err){
      next(err)
    }
  },
  async createAuthor(req, res){
     try {
      const data = req.body;
      const author = await Author.create(data);
      res.send(author);
     }catch(err){
       next(err)
     }
  },
  async show(req, res){
  	const author = await Author.findById(req.params.id);
  	res.send(author);
  },
  async update(req, res){

  },
  async remove(req, res){

  }
};

module.exports = AuthorsController;
