exports.up = knex =>
  knex.schema
    .createTable("authors", function(table) {
      table.increments("id");
      table.string("name", 255);
    })
    .createTable("books", function(table) {
      table.increments("id");
      table.string("title");
      table.integer("authorId");
      table.foreign("authorId").references("authors.id");
    });

exports.down = knex => knex.schema.dropTable("books").dropTable("authors");
