const DataLoader = require("dataloader");

module.exports = knex => ({
  authorLoader: new DataLoader(async authorIds => {
    const authors = await knex("authors").whereIn("id", authorIds);

    const authorsMap = authors.reduce(
      (map, author) => ({ ...map, [author.id]: author }),
      {}
    );
    console.log(authorIds, authorsMap)

    return authorIds.map(
      authorId => authorsMap[authorId] || new Error(`No result for ${authorId}`)
    );
  })
});
