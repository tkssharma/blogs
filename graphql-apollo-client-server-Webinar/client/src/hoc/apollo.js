import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from 'apollo-boost';
import handleErrorMiddleware from '../graphql/middleware/handleErrorMiddleware';
import AuthLink from '../graphql/middleware/authLink';

const httpLink = new HttpLink({
  // eslint-disable-next-line no-undef
  uri: 'http://localhost:4005/graphql',
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: ApolloLink.from([AuthLink, handleErrorMiddleware, httpLink]),
  cache
});

function ApolloCtxProvider(props) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default ApolloCtxProvider;
