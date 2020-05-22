import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloCtxProvider from './hoc/apollo';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ItemList from './components/ItemList.jsx'
import AddItem from './components/AddItem.jsx'

ReactDOM.render((
    <ApolloCtxProvider >
      <Router>
        <div>
          <Route exact path='/add' component={AddItem} />
          <Route exact path='/' component={ItemList} />
        </div>
      </Router>
    </ApolloCtxProvider>
  ),
  document.getElementById('root')
)
