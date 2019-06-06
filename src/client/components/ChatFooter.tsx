import * as React from 'react';
import { compose } from 'react-apollo';
import { scroller } from 'react-scroll'
import { withCreateMessage, withToggleTyping } from '../store/hoc/mutations';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';


import customTheme from '../lib/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatFooter: {
      width: '100%',
      height: 130,
      padding: theme.spacing(3, 5),
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
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  }),
);

const ChatFooter: React.FunctionComponent<{
  createMessageMutation: function;
  toggleUserTypingMutation: function;
  userId: string;
}> = ({ waitingOnMessage, userId, createMessageMutation, toggleUserTypingMutation, setIsWaitingOnMessage }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    value: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  React.useEffect(() => {
     if (waitingOnMessage) {
       // just sent message
       createMessageMutation({ text: values.value, userId }, () => {
         setIsWaitingOnMessage(false);
         setValues({ ...values, value: '' })
         scroller.scrollTo('scrollTarget', {
           duration: 1000,
           smooth: true,
           containerId: 'scrollContainer'
         })
       })
     }
  }, [{waitingOnMessage}]);

  const sendMessage = () => {
    if (!waitingOnMessage) {
      setIsWaitingOnMessage(true);
    }
  }

  return (
    <Container className={classes.chatFooter}>
      <TextField
        id="standard-multiline-flexible"
        multiline
        value={values.value}
        onChange={handleChange('value')}
        className={classes.textField}
        margin="normal"
        placeholder="Say something here..."
        onFocus={() => toggleUserTypingMutation({_id:userId, isTyping:true})}
        onBlur={() => toggleUserTypingMutation({_id:userId, isTyping:false})}
      />
      <Fab
        onClick={sendMessage}
        color="primary"
        aria-label="Add"
        className={classes.button}
        disabled={waitingOnMessage}
      >
        <Icon className={classes.rightIcon}>send</Icon>
      </Fab>
    </Container>
  );
};

export default compose(withCreateMessage, withToggleTyping)(ChatFooter);
