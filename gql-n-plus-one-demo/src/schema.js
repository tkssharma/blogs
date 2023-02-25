const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String
    author: Author!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
  }
`;

module.exports = { typeDefs };
