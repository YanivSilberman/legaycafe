import * as React from 'react';
import { Query, compose } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';

import { withUsers } from '../../store/hoc/queries';

import ChatDrawer from '../../components/Drawer';
import ChatHeader from '../../components/ChatHeader';
import ChatFooter from '../../components/ChatFooter';
import Messages from '../../components/Messages';
import AuthForm from '../../components/AuthForm';
import Spinner from '../../components/Spinner';

import DndBin from '../../components/DndBin';

import withStyles from './styles';
import { chatGql } from '../../store/gql/queries';

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

  const [selectUsers, setSelectUsers] = React.useState([]);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [waitingOnMessage, setWaitingOnMessage] = React.useState(false);

  /*
  React.useEffect(() => {
    if (this.subscription) {
      console.log('subscription', this.subscription);
      this.subscription.unsubscribe();
    }
    this.subscription = subscribeToNewMessages();
  }, [allChats]);
  */

  if (usersLoading || !User) return <Spinner />;

  const handleDrop = bin => item => {
    if (bin === "ADDER") {
      return setSelectUsers(users => users.concat(item._id));
    } else if (bin === "REMOVER") {
      return setSelectUsers(users => users.filter(i => i !== item._id));
    }
  }

  const drawerUsers = allUsers.filter(({ _id }) => _id !== User._id && selectUsers.indexOf(_id) === -1);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ChatDrawer
        allUsers={drawerUsers}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        setSelectUsers={setSelectUsers}
        onDrop={handleDrop("REMOVER")}
        {...User}
      />
      <DndBin
        accept="ADDER"
        style={classes.content}
        onDrop={handleDrop('ADDER')}
      >
        <Query
          query={chatGql}
          variables={{ users: selectUsers
            .concat(User._id)
            .sort() // alphabetically !! important;
            .join(",")
          }}
        >
          {({ data: { Chat, error, loading } }) => {
            if (error) {
              console.log('chat query error', {error});
              return 'Chat query error';
            }

            if (loading) return null;

            return Chat && (
              <>
                <ChatHeader
                  users={users}
                  selectUsers={selectUsers}
                  setOpenMobile={setOpenMobile}
                  setSelectUsers={setSelectUsers}
                />
                <Messages
                  selectUsers={selectUsers}
                  userId={User._id}
                  chat={Chat._id}
                  users={users}
                  waitingOnMessage={waitingOnMessage}
                />
                <ChatFooter
                  setIsWaitingOnMessage={setWaitingOnMessage}
                  waitingOnMessage={waitingOnMessage}
                  userId={User._id}
                  chat={Chat._id}
                />
              </>
            ) || (
              <div className="empty">
                <Icon fontSize="large">add_circle</Icon>
                <Typography as="h2">Drag avatar here to start chat</Typography>
              </div>
            )
          }}
        </Query>
      </DndBin>
    </div>
  );
};

export default compose(withStyles, withUsers)(Chat);
