import { ApolloLink } from 'apollo-boost';

const AuthLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('auth-token');
  const context = operation.getContext();
  if (context.headers && context.headers['Authorization']) {
    return forward(operation);
  }
  operation.setContext({
    headers: {
      Authorization: accessToken || null,
    },
  });
  return forward(operation);
});
export default AuthLink;
