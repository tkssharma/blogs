import { onError } from 'apollo-link-error';

const handleErrorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      const extensions = err.extensions || {};
      switch (extensions.statusCode) {
        case 401:
          // do logout
          // fetch token
          break;
        default:
        // return 1;
      }
    });
  }
  if (networkError) {
    // todo
  }
});

export default handleErrorMiddleware;
