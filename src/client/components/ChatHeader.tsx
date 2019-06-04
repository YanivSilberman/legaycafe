import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  chatHeader: {
    width: '100%',
    height: 70,
    padding: theme.spacing(3, 5),
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 20,
    display: 'inline-block'
  }
}));

const ChatHeader: React.FunctionComponent<{
  users: array;
}> = ({ users }) => {
  const classes = useStyles();

  return (
    <Container className={classes.chatHeader}>
      {users.map(user => (
        <Avatar
          key={user._id}
          className={classes.avatar}
          alt={user.firstName}
          src={user.avatar}
        />
      ))}
    </Container>
  );
};

export default ChatHeader;
