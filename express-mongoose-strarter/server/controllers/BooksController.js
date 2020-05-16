const { BlogPost } = require('../models');

module.exports = {
	async index(){
		return await Book.all().populate('author');
	}

};