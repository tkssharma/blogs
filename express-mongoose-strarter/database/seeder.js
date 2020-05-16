const dotenv = require('dotenv');
dotenv.config();

require('./index');
const mongoose = require('mongoose');
const { Author, Book } = require('../server/models');

async function seedAuthors() {
  console.log('Seeding authors to ' + mongoose.connection.name + '...');
  const authors = [
    { name: 'JK Rowling', bio: 'J.K. Rowling is the author of the much-loved series of seven Harry Potter novels, originally published between 1997 and 2007.' },
    { name: 'Tony Robbins', bio: 'Tony Robbins is an entrepreneur, best-selling author, philanthropist and the nation\'s #1 Life and Business Strategist.' },
  ];

  for (author of authors) {
    var newAuthor = new Author(author);
    await newAuthor.save();
  }

  const a = await Author.find();
  console.log('authors: ', a);
}

async function seedBooks() {
  console.log('Seeding books to ' + mongoose.connection.name + '...');

  const jkRowling = await Author.findOne({ name: 'JK Rowling' });
  const tonyRobbins = await Author.findOne({ name: 'Tony Robbins' });

  let harryPotter = new Book({ title: 'Harry Potter', author: jkRowling._id });
  let awakenGiant = new Book({ title: 'Awaken the Giant Within', author: tonyRobbins._id });

  await harryPotter.save();
  await awakenGiant.save();

  jkRowling.books.concat([harryPotter]);
  tonyRobbins.books.concat([awakenGiant]);
  await jkRowling.save();
  await tonyRobbins.save();
}

seedAuthors();
seedBooks();

