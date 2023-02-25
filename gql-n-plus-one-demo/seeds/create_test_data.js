const faker = require("faker");
const ovule = {
  authors: [],
  books: []
};

for (let i = 1; i <= 25; i++) {
  const author = {
    id: i,
    name: faker.name.firstName()
  };

  const min = Math.ceil(1);
  const max = Math.floor(5);
  const numBetweenRange = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let j = 1; j <= numBetweenRange; j++) {
    ovule.books.push({
      title: faker.company.catchPhrase(),
      authorId: author.id
    });
  }

  ovule.authors.push(author);
}

exports.seed = async knex => {
  await knex("books").del();
  await knex("authors").del();

  await knex("authors").insert([...ovule.authors]);
  await knex("books").insert([...ovule.books]);
};
