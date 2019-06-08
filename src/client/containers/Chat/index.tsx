import * as React from 'react';
import { compose } from 'react-apollo';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withUsers } from '../../store/hoc/queries';

import ChatHeader from '../../components/ChatHeader';
import ChatFooter from '../../components/ChatFooter';
import Messages from '../../components/Messages';
import AuthForm from '../../components/AuthForm';
import Spinner from '../../components/Spinner';

import useStyles from './styles';

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
  const classes = useStyles();

  const [state, setState] = React.useState({
    waitingOnMessage: false
  });

  if (usersLoading || !User) return <Spinner />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      </Drawer>
      <Container className={classes.content} maxWidth="sm">
        <ChatHeader
          users={allUsers}
        />
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
    </div>
  );
};

export default compose(withUsers)(Chat);
