import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import AuthForm from '../components/AuthForm';

import customTheme from '../lib/theme';

const useStyles = makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
      minHeight: 100,
      maxHeight: 100,
      width: '100%'
    }
  })
});

const Login: React.FunctionComponent<> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AuthForm />
    </div>
  );
};

export default Login;
