import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { ApolloProvider, Query } from "react-apollo";
import { ThemeProvider } from '@material-ui/styles';

import { userGql } from './store/gql/queries';
import client from './lib/apollo';
import theme from './lib/theme';

import Chat from './containers/Chat';
import Login from './containers/Login';

const PrivateRoute = ({ User, Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      User !== null
        ? <Component User={User} {...props} />
        : <Redirect to='/login' />
    )
  }} />
)

const App = () => (
  <ApolloProvider client={client}>
    <Query query={userGql}>
      {({ data: { error, loading, User } }) => {
        if (error) throw ('Initial user query error, fuck', error);
        if (loading || User === undefined) return 'Verifying auth...';

        return (
          <BrowserRouter>
            <PrivateRoute User={User} exact path="/" Component={Chat} />
            <Route path="/login" exact component={Login} />
          </BrowserRouter>
        )
      }}
    </Query>
  </ApolloProvider>
)

render(<App />, document.getElementById('main'));
