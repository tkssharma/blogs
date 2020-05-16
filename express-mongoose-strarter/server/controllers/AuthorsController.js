const { Author } = require('../models');

const AuthorsController = {
  async index(req, res){
  	const authors = await Author.find().populate('books');
  	res.send(authors);
  },
  async store(req, res){
  	
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