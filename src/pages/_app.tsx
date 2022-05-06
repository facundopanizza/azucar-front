import '../styles/index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {onError } from "@apollo/client/link/error";
import {  setContext} from '@apollo/client/link/context'
import { Router } from 'next/router';

const httpLink = createHttpLink({ 
  uri: `${process.env.NEXT_PUBLIC_BACK_URL}/graphql`
})

const errorControl = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED' || err.extensions.message === 'Context creation failed: you must be logged in')   {
        console.log('asdas');
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
    }
  }

  if (networkError) {
    console.log(" [Network error]:", networkError)
  };
});

const authLink = setContext((_, { headers} ) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
})

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACK_URL}/graphql`,
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
