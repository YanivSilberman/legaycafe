import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';


const httpUri = `${process.env.FULL_URL}/graphql`;

// Create an http link:
const httpLink = new HttpLink({
  uri: httpUri,
  credentials: 'same-origin'
});

console.log('\n\n\n\n\n\n\n', { httpUri });

// Authentication link:
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const uri = `ws${process.env.NODE_ENV === "production" ? "s" : ""}://${process.env.URL}/graphql`;
console.log('\n\n\n\n\n\n\n', { uri });

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
