import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import '../styles/index.css';

const httpLink = createHttpLink({
  uri: `https://azucar-api.panizza.dev/graphql`,
});

const errorControl = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (
        err.extensions.code === 'UNAUTHENTICATED' ||
        err.extensions.message ===
          'Context creation failed: you must be logged in'
      ) {
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
    }
  }

  if (networkError) {
    console.log(' [Network error]:', networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  uri: `https://azucar-api.panizza.dev/graphql`,
  link: errorControl.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
