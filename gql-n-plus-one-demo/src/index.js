const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema");

const { resolvers } = require("./resolvers");
const { resolversDataLoader } = require("./resolversDataLoader");

const { shouldUseDataLoader } = require("../config");

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);

const { authorLoader } = require("./loaders/authorLoader")(knex);
const { bookLoader } = require("./loaders/bookLoader")(knex);

const server = new ApolloServer({
  typeDefs,
  resolvers: shouldUseDataLoader ? resolversDataLoader : resolvers,
  context: () => ({
    knex,
    ...(shouldUseDataLoader ? { authorLoader, bookLoader } : null)
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);

  shouldUseDataLoader
    ? console.log("\x1b[36m%s\x1b[0m", "[INFO]: using dataloader")
    : console.log("\x1b[31m%s\x1b[0m", "[INFO]: not using dataloader");
});
