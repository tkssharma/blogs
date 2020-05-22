import express from 'express'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import schema from './schema/schema.js.js'

const app = express()

// GraphQL Schema is imported here
const graphQLSchema = schema

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
  console.log('Listening on http://localhost:3000/')
  console.info('GraphQL endpoint: http://localhost:3000/graphql')
  console.info('GraphQL console: http://localhost:3000/graphiql')
})
