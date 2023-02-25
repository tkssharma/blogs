const resolversDataLoader = {
  Book: {
    author: async ({ authorId }, args, { authorLoader }) => {
      const author = await authorLoader.load(authorId);

      return author;
    }
  },
  Author: {
    books: async ({ id }, args, { bookLoader }) => {
      const books = await bookLoader.load(id);

      return books;
    }
  },
  Query: {
    books: async (parent, args, { knex }) => {
      const books = await knex("books").select();

      return books;
    },
    authors: async (parent, args, { knex }) => {
      const authors = await knex("authors").select();

      return authors;
    }
  }
};

module.exports = { resolversDataLoader };
