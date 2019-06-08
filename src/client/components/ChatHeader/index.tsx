import * as React from 'react';
import { withApollo } from 'react-apollo';

import {useTrail, animated} from 'react-spring'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

const ChatHeader: React.FunctionComponent<{
  users: array;
  client: object;
}> = ({ users, client }) => {
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem('token');
    client.resetStore();
  }

  const config = { mass: 5, tension: 2000, friction: 200 };

  const usersLength = users ? users.length : 0;
  const [trail, set, stop] = useTrail(usersLength, () => ({
    config,
    to: { opacity: 1, height: 40 },
    from: { opacity: 0, height: 0 },
  }))

  return (
    <Container className={classes.chatHeader}>
      {trail.map(({ x, ...rest }, index) => (
        <animated.div
          key={users[index]._id}
          className="trails-text"
          style={{ ...rest }}>
          <Avatar
            key={users[index]._id}
            className={classes.avatar}
            alt={users[index].firstName}
            src={users[index].avatar}
          />
        </animated.div>
      ))}
      <div className={classes.buttonContainer}>
        <Button className={classes.button} onClick={logout}>
          Sign Out
        </Button>
      </div>
    </Container>
  );
};

export default withApollo(ChatHeader);
