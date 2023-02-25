const resolvers = {
  Book: {
    author: async ({ authorId }, args, { knex }) => {
      const author = await knex("authors")
        .where({
          id: authorId
        })
        .first();

      return author;
    }
  },
  Author: {
    books: async ({ id }, args, { knex }) => {
      const books = await knex("books").where({ authorId: id });

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

module.exports = { resolvers };
