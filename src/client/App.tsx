import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, __RouterContext } from "react-router-dom";

import { ApolloProvider, Query } from "react-apollo";
import { ThemeProvider } from '@material-ui/styles';

import {useTransition, animated} from 'react-spring';

import { userGql } from './store/gql/queries';
import client from './lib/apollo';
import theme from './lib/theme';

import Chat from './containers/Chat';
import Login from './containers/Login';

interface PrivateProps {
  User?: object;
  Component: any;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FunctionComponent<PrivateProps> = ({ User, Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      User !== null
        ? <Component User={User} {...props} />
        : <Redirect to='/login' />
    )
  }} />
)

const pages = {
  chat: ({ style, history, User }) => (
    <animated.div style={{ ...style }}>
      <PrivateRoute User={User} path="/" exact Component={Chat} />
    </animated.div>
  ),
  login: ({ style, history }) => (
    <animated.div style={{ ...style }}>
      <Route path="/login" exact component={Login} />
    </animated.div>
  ),
}

interface RouterProps {
  User?: object;
}

const RouterApp: React.FunctionComponent<RouterProps> = ({ User }) => {
  const { location, history } = React.useContext(__RouterContext);

  const [index, set] = React.useState('chat');

  React.useEffect(
    () => {
      if (location.pathname === '/') set('chat');
      if (location.pathname === '/login') set('login');
    },
    [location.pathname],
  )

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page User={User} key={key} style={props} history={history} />;
      })}
    </div>
  )
}

const App: React.FunctionComponent = () => (
  <ApolloProvider client={client}>
    <Query query={userGql}>
      {({ data: { error, loading, User } }) => {
        if (error) {
          console.log(error);
          return 'app error';
        };

        if (loading || User === undefined) return null;

        return (
          <BrowserRouter>
            <RouterApp User={User} />
          </BrowserRouter>
        )
      }}
    </Query>
  </ApolloProvider>
)



render(<App />, document.getElementById('main'));
