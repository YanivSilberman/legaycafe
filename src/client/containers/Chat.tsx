import * as React from 'react';
import { compose } from 'react-apollo';
import { withUsers, withUser } from '../store/hoc/queries';

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

const drawerWidth = '50%';

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
  UserLoading,
  users,
  allUsers,
  usersLoading,
}) => {

  if (usersLoading || UserLoading) return 'loading ...';

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {User || (
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
      )}
      <Container className={classes.content} maxWidth="sm">
        {User && (
          <>
            <ChatHeader users={allUsers} />
            <Messages users={users} userId={User._id} />
            <ChatFooter userId={User._id} />
          </>
        ) || (
          <h1>Welcome</h1>
        )}
      </Container>
    </div>
  );
};

export default compose(withUsers, withUser)(Chat);
