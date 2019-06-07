import * as React from 'react';
import { compose } from 'react-apollo';
import { withUsers } from '../store/hoc/queries';

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import Messages from '../components/Messages';
import AuthForm from '../components/AuthForm';

import customTheme from '../lib/theme';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
      minHeight: 100,
      maxHeight: 100,
      width: '100%'
    },
    drawer: {
      width: drawerWidth,
      minWidth: drawerWidth,
      maxWidth: drawerWidth,
      flex: 0,
    },
    drawerPaper: {
      width: drawerWidth,

      ":before": {
       content: "",
       background: "inherit",
       position: "absolute",
       left: 0,
       right: 0,
       top: 0,
       bottom: 0,
       boxShadow: "inset 0 0 0 3000px rgba(255,255,255,0.3)",
       filter: "blur(10px)"
      }
    },
    content: {
      flex: 1,
      backgroundColor: theme.palette.background.default,
      padding: 0,
      margin: 0,
      maxHeight: '100vh',
      minHeight: '100vh',
      maxWidth: 1000,
      display: 'flex',
      flexDirection: 'column'
    },
  })
});

const Chat: React.FunctionComponent<{
  User: object;
  UserLoading: boolean;
  users: object;
  usersLoading: boolean;
}> = ({
  User,
  users,
  allUsers,
  usersLoading,
}) => {

  if (usersLoading) return 'loading ...';

  const classes = useStyles();

  const [state, setState] = React.useState({
    waitingOnMessage: false
  });

  /*
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };
  */

  return (
    <div className={classes.root}>
      <CssBaseline />
      {(User === null) && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <AuthForm />
        </Drawer>
      ) || (
        <Container className={classes.content} maxWidth="sm">
          {/*<ChatHeader
            users={allUsers}
          />*/}
          <Messages
            users={users}
            userId={User._id}
            waitingOnMessage={state.waitingOnMessage}
          />
          <ChatFooter
            setIsWaitingOnMessage={(isWaiting) => setState({
              ...state,
              waitingOnMessage: isWaiting
            })}
            waitingOnMessage={state.waitingOnMessage}
            userId={User._id}
          />
        </Container>
      )}
    </div>
  );
};

export default compose(withUsers)(Chat);
