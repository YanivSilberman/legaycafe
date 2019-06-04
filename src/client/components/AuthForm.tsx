import * as React from 'react';
import { compose } from 'react-apollo';
import { withLoginUser } from '../store/hoc/mutations';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import customTheme from '../lib/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authForm: {
      width: '100%',
      height: 130,
      padding: theme.spacing(3, 5),
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textField: {
      flex: 1,
      marginRight: 40
    },
    button: {
      margin: theme.spacing(1),
      background: customTheme.button
    }
  }),
);

const AuthForm: React.FunctionComponent<> = ({
  loginUserMutation
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className={classes.chatFooter}>
      <TextField
        id="outlined-email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={values.email}
        onChange={handleChange('email')}
      />
      <TextField
        id="standard-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        value={values.password}
        onChange={handleChange('password')}
      />
    </Container>
  );
};

export default compose(withLoginUser)(AuthForm);
