# Graphql N+1 problem demonstration

## TL;DR

Using graphql type resolvers result in the N+1 problem, that is, N extra database queries per 1 'parent' database query. This repo demonstrates this with a basic example, and one possible solution using dataloader.

## Description

TODO

## Setup

### Installation

`npm install`

### Database setup and seed

`npm run db:migrate`

`npm run db:seed`

### Start server

`npm start`

### Toggle usage of dataloader

Change `shouldUseDataLoader` in the config.js file to true or false, to use or not use the dataloader, respectively. nodemon will reload the server, and you will see a message in the console saying if the dataloader is being used.

## Steps to observe N+1 problem

1. Send the following query from the graphql playground (http://localhost:4000/)

```
query	 {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

2. While not using the dataloader, you will see 1 sql query executed to select all books, and N (25 in this example) sql queries executed to get all the authors.

3. Set `shouldUseDataLoader` in the config.js file to true and save the file, and resend the query in step 1. You will see 1 sql query executed to select all books, and 1 sql query executed to select all authors 🥳.

4. To see the an even more drastic example, send the following query with `shouldUseDataLoader` set to false:

```
query {
  authors {
    id
    name
    books {
      id
      title
    }
  }
}
```

5. Each author may have up to 5 books. Not a great deal of data, by any means, but in a scenario where every author had 5 books, 1 sql query would be executed to get all authors, and 125 sql queries would be executed to get all books ☠️.

##### Note

- built using node v12.13.1

- npx is used to run knex and nodemon so no global installation is required. (see: package.json)

- npm start script is configured for windows, to run on osx change the following:

  `"set DEBUG=knex:query && npx nodemon src/index"`

  to

  `"DEBUG=knex:query npx nodemon src/index"`
