import '../styles/index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {  setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({ 
  uri: `${process.env.NEXT_PUBLIC_BACK_URL}/graphql`
})

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
  link: authLink.concat(httpLink),
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
