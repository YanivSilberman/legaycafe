import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthForm from '../components/AuthForm';
import customTheme from '../lib/theme';

const Login: React.FunctionComponent<{
  classes: any
}> = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <AuthForm />
  </div>
);

export default withStyles({
  root: {
    display: 'flex',
    minHeight: 100,
    maxHeight: 100,
    width: '100%'
  }
})(Login);
