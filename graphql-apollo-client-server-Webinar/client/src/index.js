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
import AddItem from './components/AddItem.jsx'

const client = new ApolloClient({
  // replace the uri with your server's host/port
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

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