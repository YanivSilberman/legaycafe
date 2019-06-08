import * as React from 'react';
import { withRouter } from "react-router-dom";
import { withApollo, compose } from 'react-apollo';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withLoginUser } from '../../store/hoc/mutations';
import useStyles from './styles';

const AuthForm: React.FunctionComponent<> = ({
  loginUserMutation,
  client,
  history
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
      client.resetStore().then(() => {
        history.push("/");
      })
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

export default compose(withRouter, withApollo, withLoginUser)(AuthForm);
