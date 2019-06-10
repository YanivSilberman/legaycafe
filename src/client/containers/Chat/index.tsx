import * as React from 'react';
import { compose } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withUsers } from '../../store/hoc/queries';

import ChatDrawer from '../../components/Drawer';
import ChatHeader from '../../components/ChatHeader';
import ChatFooter from '../../components/ChatFooter';
import Messages from '../../components/Messages';
import AuthForm from '../../components/AuthForm';
import Spinner from '../../components/Spinner';

import withStyles from './styles';

interface ChatProps {
  User: User;
  UserLoading: boolean;
  users: object;
  allUsers: User[];
  usersLoading: boolean;
  classes: any;
}

const Chat: React.FunctionComponent<ChatProps> = ({
  User,
  users,
  allUsers,
  usersLoading,
  classes
}) => {

  const [openMobile, setOpenMobile] = React.useState(false);
  const [state, setState] = React.useState({
    waitingOnMessage: false
  });



  if (usersLoading || !User) return <Spinner />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ChatDrawer
        allUsers={allUsers}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        {...User}
      />
      <Container className={classes.content} maxWidth="sm">
        <ChatHeader
          allUsers={allUsers}
          setOpenMobile={setOpenMobile}
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

export default compose(withStyles, withUsers)(Chat);
