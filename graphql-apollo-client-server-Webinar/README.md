# Graphql client side and server side 

- [GraphQL Quick-Start Guide](#graphql-quick-start-guide)
  - [Prerequisites](#prerequisites)
- [Server-Side Development](#server-side-development)
  - [Required libraries](#required-libraries)
  - [Directory structure](#directory-structure)
  - [Setting up the GraphQL server](#setting-up-the-graphql-server)
  - [Defining the Schema](#defining-the-schema)
    - [Define Types](#define-types)
    - [Define Root-Level Query Type](#define-root-level-query-type)
      - [Example](#example)
    - [Define Resolvers](#define-resolvers)
      - [Implement the `RootQuery` resolvers](#implement-the-rootquery-resolvers)
      - [Implement the `Item` resolvers](#implement-the-item-resolvers)
    - [Resolver Summary](#resolver-summary)
  - [Putting the Schema + Resolvers Together](#putting-the-schema--resolvers-together)
  - [Run the server](#run-the-server)
- [Client-side Development](#client-side-development)
  - [Required libraries](#required-libraries-1)
  - [Directory structure](#directory-structure-1)
  - [Apollo Client + Routing setup](#apollo-client--routing-setup)
  - [Define queries](#define-queries)
  - [`ItemList` component](#itemlist-component)
  - [Run the server](#run-the-server-1)
- [Mutations](#mutations)
  - [Define Server-side mutation](#define-server-side-mutation)
    - [Define the `RootMutation` type entrypoint definitions](#define-the-rootmutation-type-entrypoint-definitions)
    - [Define the `RootMutation` resolver](#define-the-rootmutation-resolver)
    - [Add the `RootMutation` resolver to the master resolvers](#add-the-rootmutation-resolver-to-the-master-resolvers)
    - [Register the `RootMutation` type to the schema](#register-the-rootmutation-type-to-the-schema)
    - [Test the implementation](#test-the-implementation)
  - [Client-side mutation integration](#client-side-mutation-integration)
    - [Create an `addItem` query](#create-an-additem-query)
    - [Create an `AddItem` component](#create-an-additem-component)
    - [Add the route to the `AddItem` component](#add-the-route-to-the-additem-component)
    - [Test implementation](#test-implementation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# GraphQL Quick-Start Guide

Goal: Learn how GraphQL development works on the server + client at a basic level. Hit the ground running with
something working.

The following uses Apollo tooling. Apollo was chosen because it was easy to develop with using their tooling compared to Relay Classic.

https://www.apollodata.com/

https://www.codazen.com/choosing-graphql-client-apollo-vs-relay/

## Prerequisites

- You should be familiar with setting up a node.js server / babel transpiling / bundling (if necessary)
- Read the basics of how GraphQL queries / types work - http://graphql.org/learn/
  - If you're a bit unclear on either, the guide will hopefully show how it works and fits together
- ES6 usage - uncommonly used ES6 elements are clarified in the examples
- You've done some OOP / data(base) modeling

The Apollo Developer Chrome extension is very useful. Gives you the view of the underlying redux store state, and you can also try queries as well.

https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US

# Server-Side Development

Goal: Understand what server-side development / structure is like.

Resources used:

http://dev.apollodata.com/tools/

https://github.com/Akryum/apollo-server-example

https://github.com/apollographql/apollo-server-tutorial

## Required libraries

- graphql - facebook graphql library
- graphql-server-express - Apollo-developed
- graphql-tools - Apollo-developed server tooling
- cors
- body-parser
- express

## Directory structure

At the time of this writing, I'm unsure what the official directory structure should be. I organized items into what I thought made sense while I was learning this.

Each item will be explained in the guide.

```
├── schema/
│   ├── item/
│   │   ├── item.type.js
│   │   └── item.resolvers.js
│   ├── root-query/
│   │   ├── root-query.type.js
│   │   └── root-query.resolvers.js
│   ├── user/
│   │   └── user.type.js
│   ├── resolvers.js
│   └── schema.js
├── app.js
├── db.js
└── package.json
```

## Setting up the GraphQL server

```javascript
// app.js

import express from 'express'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

// GraphQL Schema is imported here
const graphQLSchema = `...`

// enable cors support so when the client on a different host tries to query the server
// the client will not be blocked
// note: these are really insecure rules to use
app.use('*', cors({
  origin: '*'
}))

// graphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }))

// graphQL console
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(3000, () => {
  console.log(`Ready in ${Date.now() - start} ms!`)
  console.log('Listening on http://localhost:3000/')
})
```

## Defining the Schema

http://graphql.org/learn/schema/

### Define Types

Define types for objects you want to allow GraphQL to query on.

```javascript
// schema/item/item.type.js

const ItemType = `
  type Item {
    # Item identifier
    id: ID!
    # Item name
    name: String!
    # Item description
    desc: String
    # Owner of the item
    owner: User
  }
`

export default ItemType
```

### Define Root-Level Query Type

A root-level query is defined just like any other type, but they are used as the main entrypoint into a GraphQL query.

#### Example

To query for an item and get a list of items at the same time, we might perform the following query:

```graphQL
query {
  item (id: 1) {
    name
  }
  items {
    id
    name
  }
}
```

In this situation, we have two main entrypoints:

- `item` (get a single item)
- `items` (get all item)

*Note: You can name the entrypoint whatever you want, some people might use `getItem` or `getItems`,
but the convention seems to just be the object name itself for reading items.*

In order to expose these entrypoints, we'll define the following:

```javascript
// schema/root-query/root-query.type.js

const queryEntryPoints = `
  type RootQuery {
    # get an item
    item(id: String!): Item,
    # returns an array of items
    items: [Item]
  }
`

export default queryEntryPoints
```

*Note: the name of the type (RootQuery in this example), can be named anything you want.*

### Define Resolvers

Resolvers perform lookups on the fields of a type when that field is being requested and the data is unavailable.

#### Implement the `RootQuery` resolvers

In the sample query above, GraphQL will be looking at the `RootQuery` for an `item` and `items` field.

For each field, we will need to define a resolver.

http://dev.apollodata.com/tools/graphql-tools/resolvers.html#Resolver-function-signature

```javascript
// schema/root-query/root-query.resolvers.js

// must match the field items in RootQuery
const rootQueryResolvers = {
  // this is the resolver for RootQuery.item
  // the first param represents the parent object, which in this case, would be the RootQuery
  // the second param is incoming parameters
  async item (rootObj, { id }) {
    // returns an object that matches the ItemType fields
    return await getItem(id)
  },
  // this is the resolver for RootQuery.items
  async items () {
    // would return an array of Item
    return await getItems()
  }
}

export default rootQueryResolvers
```

#### Implement the `Item` resolvers

Let's assume we have the following incoming query, which requests the following:

- The name of the item
- The item owner's username

```graphQL
query {
  item (id: 1) {
    name
    owner {
       username
    }
  }
}
```

In order to return the data back:

- GraphQL calls the `RootQuery#item()` resolver
- `getItem(id)` implemented in `RootQuery#item()` would be defined to a database fetch for the item using the `id`
- The database returns something like the following, which `RootQuery#item()` will return

```javascript
{
  id: 1,
  name: 'Test Item',
  description: 'This is a test item',
  ownerId: 234
}
```

- GraphQL attempts to map the object properties to the `Item` type (since the field `RootQuery.item` returns an `Item`)
- GraphQL notices we need the `Item.owner` field, but the data is not included in the above returned data
- GraphQL will now call a resolver for `Item.owner` to attach the owner

```javascript
// schema/item/item.resolvers.js

// must match the field names in the Item type for field data
// that cannot be obtained at the parent level (eg RootQuery#item())
// meaning not every field needs a resolver implementation
const itemResolvers = {
  // this is the resolver for Item.owner
  // the first param represents the parent object, which in this case, would be the database results
  // that were mapped to the Item fields
  async owner (item) {
    // returns an object that matches a User type (that we need to define)
    return await getUser(item.ownerId)
  }
}

export default itemResolvers
```

```javascript
// schema/user/user.type.js

const userType = `
  type User {
    # User identifier
    id: ID!
    # The user's username
    username: String!
  }
`

export default userType
```

- The `getUser(item.ownerId)` implementation would be a database call to fetch the user; the returned data
should map to the `User` type fields
- GraphQL now has the data for item name and owner's username and returns the result to the client

### Resolver Summary

- Object lookups start at the root, in this case the `RootQuery` type was defined with an `item` field
- The `RootQuery#item()` resolver returned an object that mapped to most fields of the `Item` type, but we were lacking the `Item.owner` data
- To get the `Item.owner` data, GraphQL called the `Item#owner()` resolver, which did a fetch to get the user data
- The results from `Item#owner()` is attached to the `Item.owner` field
- We now have the item's name and the owner username, so GraphQL returns just those pieces to the client

## Putting the Schema + Resolvers Together

We combine our resolvers into a single package

```javascript
// schema/resolvers.js

import Item from './item/item.resolvers'
import RootQuery from './root-query/root-query.resolvers'

export default {
  // no need to define a User resolver
  // since the Item retrieves it
  Item,
  RootQuery
}
```

Our entire schema is built here

```javascript
// schema/schema.js

import UserType from './user/user.type'
import ItemType from './item/item.type'

import RootQuery from './root-query/root-query.type'
import resolvers from './resolvers'

import { makeExecutableSchema } from 'graphql-tools'

// the schema type only has two properties: query and mutations
// the RootQuery contains the root entry points into graphQL
// If you want to define more entry points, you add to RootQuery

// Note: the RootQuery defined in `schema { }` is NOT the `import RootQuery`
// It is the reference to the `type RootQuery` definition
// Ex: if you renamed `type RootQuery` -> `type MasterQuery`, then
// it should be `schema { query: MasterQuery }`
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

const schema = makeExecutableSchema({
  // Add the type definitions to the schema
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    UserType,
    ItemType
  ],
  // performs field lookups for a specific type
  resolvers
})

export default schema
```

Now hook up the schema

```javascript
// app.js

import express from 'express'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import schema from './schema/schema.js'

// GraphQL Schema is imported here
const graphQLSchema = schema

...
```

## Run the server

`npm start`

You can try a sample query here through the GraphQL console:

http://localhost:3000/graphiql?query=query%20getItems%20%7B%0A%20%20items%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D&operationName=getItems

# Client-side Development

Goal: Implement some really basic stuff to test the server implementation. Also understand what dev is like using the Apollo client.

This does not cover:

- How to break up your GraphQL queries into fragments
- How to perform mutations on your data (they're barely any different than defining calling a query)
- Best practices on how to structure your files, break apart your components to be more **dumb**, etc

Resources used:

https://www.learnapollo.com/tutorial-react/react-01

## Required libraries

- react
- react-dom
- apollo-client
- react-apollo
- prop-types
- graphql-tag
- react-router-dom

## Directory structure

This structure is really bare-bones and has no rhyme or reason to it, it was just made to get off the ground running quickly to understand the client implementation.

```
├── queries/
│   └── item.queries.js
├── components/
│   └── ItemList.jsx
├── index.js
└── package.json
```

## Apollo Client + Routing setup

```javascript
// index.js

import React from 'react'
import ReactDOM from 'react-dom'

// The ApolloClient allows you to call the GraphQL API server
// and parses responses
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// The ApolloProvider uses redux underneath the hood
// and provides data connections to your components
import { ApolloProvider } from 'react-apollo'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ItemList from './components/ItemList.jsx'

const client = new ApolloClient({
  // replace the uri with your server's host/port
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

ReactDOM.render((
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path='/' component={ItemList} />
        </div>
      </Router>
    </ApolloProvider>
  ),
  document.getElementById('root')
)
```

## Define queries

```javascript
// queries/item.queries.js

import gql from 'graphql-tag'

export default {
  // this is a feature called template tags
  // https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates
  getItemList: gql`query ItemListQuery {
    items {
      id
      name,
      owner {
        username
      }
    }
  }`
}

```

## `ItemList` component

```javascript
// components/ItemList.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import itemQueries from '../queries/item.queries.js'

class ItemList extends React.Component {
  render () {
    const {
      data
    } = this.props

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (data.error) {
      console.log(data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        <ul>
        {data.items.map((item) => {
          return (
            <li key={item.id}>
              {item.id} - {item.name} - {item.owner.username}
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

ItemList.propTypes = {
  // This structure is Apollo-specific
  // the prop starts with a data root key
  // and contains loading, error, and your graphql root fields
  // that you're interested in pulling
  // see: https://www.learnapollo.com/tutorial-react/react-02#Displaying[object Object]information[object Object]of[object Object]your[object Object]trainer
  // under "Using query results in React components"

  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    // This corresponds with the 'items' field in the 'ItemListQuery'
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired
}

// wrap the graphql (Apollo) store around the component
// and call the getItemList query when there is a need to fetch data
const ItemListView = graphql(itemQueries.getItemList)(ItemList)

export default ItemListView
```

## Run the server

`npm run start`

http://localhost:3001/

# Mutations

Mutations involves updating data. The following will describe how to implement mutations.

http://graphql.org/graphql-js/mutations-and-input-types/

## Define Server-side mutation

Implementing a mutation entrypoint is just like defining a normal query entrypoint:

### Define the `RootMutation` type entrypoint definitions

We'll add a field called `RootMutation.addItem`, which will be the entrypoint to add an item.

```javascript
// schema/root-mutation/root-mutation.type.js

const RootMutation = `
  type RootMutation {
    addItem (
      name: String!,
      desc: String,
      ownerId: ID!
    ): Item
  }
`
export default RootMutation

```

*Just like the `RootQuery`, you can change the name of the `RootMutation` type to whatever you want.*

### Define the `RootMutation` resolver

Defining the resolver is just like any other resolver.

```javascript
// schema/root-mutation/root-mutation.resolvers.js

const rootMutationResolvers = {
  // this corresponds to the `RootMutation.addItem` type
  async addItem (rootObj, { name, desc, ownerId }) {
    // you'd have to implement this method yourself, would insert the item into a db
    return await addNewItem({ name, desc, ownerId })
  }
}

export default rootMutationResolvers
```

### Add the `RootMutation` resolver to the master resolvers

```javascript
// schema/resolvers.js

// I'm not including the other imports for clarity
import RootMutation from './root-mutation/root-mutation.resolvers.js'

export default {
  Item,
  RootQuery,
  // New addition here
  RootMutation
}
```

### Register the `RootMutation` type to the schema

```javascript
// schema/schema.js

// not including the other imports here for clarity
import RootMutation from './root-mutation/root-mutation.type.js'

// attach the RootMutation as a mutation
// only ONE root query and mutation can be defined
const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    // New addition here, can be added in any position in this array
    RootMutation,
    UserType,
    ItemType
  ],
  resolvers
})

```

### Test the implementation

Run the server, and try this query

http://localhost:3000/graphiql?query=mutation%20newItem%20%7B%0A%20%20addItem(name%3A%22new.item%22%20desc%3A%20%22This%20is%20a%20new%20item%22%20ownerId%3A%201)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D&operationName=newItem

## Client-side mutation integration

### Create an `addItem` query

```javascript
// queries/item.queries.js

export default {
  ...
  // see https://www.learnapollo.com/tutorial-react/react-05/
  //
  addItem: gql`mutation addNewItem ($name: String!, $desc: String, $ownerId: ID!) {
    addItem(name: $name, desc: $desc, ownerId: $ownerId) {
      id
    }
  }`
}

```

### Create an `AddItem` component

```javascript
// components/AddItem.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import itemQueries from '../queries/item.queries.js'

class AddItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      desc: ''
    }
  }

  handleSave = () => { // eslint-disable-line no-undef
    const {
      name,
      desc
    } = this.state

    const ownerId = 1

    // see https://www.learnapollo.com/tutorial-react/react-05/
    // "Using mutations in components"
    this.props.mutate({variables: { name, desc, ownerId }}).then(() => {
      // @todo bug: Item list doesn't refresh on redirect
      this.props.history.replace('/')
    })
  }

  render () {
    return (
      <div>
        <input
          placeholder='name'
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br /><br />
        <input
          onChange={(e) => this.setState({desc: e.target.value})}
          placeholder='description'
          value={this.state.desc}
        />
        <br /><br />
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
}

AddItem.propTypes = {
  // When this prop is defined
  // Apollo will look at the RootQuery.mutate schema and connect addItem
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object
}

const AddItemWithMutation = graphql(itemQueries.addItem)(AddItem)

export default AddItemWithMutation
```

### Add the route to the `AddItem` component

```javascript
// index.js

...

import ItemList from './components/ItemList.jsx'
import AddItem from './components/AddItem.jsx'

...

ReactDOM.render((
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path='/add' component={AddItem} />
          <Route exact path='/' component={ItemList} />
        </div>
      </Router>
    </ApolloProvider>
  ),
  document.getElementById('root')
)

```

### Test implementation

Make sure the GraphQL server is running, then start your client server.

http://localhost:3001/add

Input some values and hit add. It'll redirect to the item list,
but you'll have to refresh to see your added item (someone come in and fix this please!)
