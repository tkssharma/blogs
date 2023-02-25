const DataLoader = require("dataloader");

module.exports = knex => ({
  bookLoader: new DataLoader(async authorIds => {
    const books = await knex("books").whereIn("authorId", authorIds);

    const booksMap = books.reduce((map, book) => {
      map[book.authorId]
        ? (map[book.authorId] = [...map[book.authorId], book])
        : (map[book.authorId] = [book]);

      return map;
    }, {});

    return authorIds.map(
      authorId => booksMap[authorId] || new Error(`No result for ${authorId}`)
    );
  })
});
