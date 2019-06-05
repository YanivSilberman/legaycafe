import * as React from 'react';
import { withApollo, compose } from 'react-apollo';
import { withLoginUser } from '../store/hoc/mutations';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import customTheme from '../lib/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authForm: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textField: {},
    button: {
      color: '#fff',
      margin: theme.spacing(2),
      padding: theme.spacing(1, 4),
      background: customTheme.button
    }
  }),
);

const AuthForm: React.FunctionComponent<> = ({
  loginUserMutation,
  client
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    error: null
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    const { data: { loginUser } } = await loginUserMutation({ ...values });
    if (loginUser == "false") {
      setValues({ ...values, error: 'Password or email are incorrect' });
    } else {
      // success
      localStorage.setItem('token', loginUser);
      // update apollo cache
      client.resetStore()
    }
  }

  return (
    <Container className={classes.authForm}>
      <Typography component="h1">
        Sign In
      </Typography>
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
        variant="outlined"
        value={values.password}
        onChange={handleChange('password')}
      />
      <Button className={classes.button} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default compose(withApollo, withLoginUser)(AuthForm);
