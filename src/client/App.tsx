import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from '@material-ui/styles';

import client from './lib/apollo';
import theme from './lib/theme';

import Chat from './containers/Chat';

const App = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)

render(<App />, document.getElementById('main'));
