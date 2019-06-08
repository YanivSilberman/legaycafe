import * as React from 'react';

import {useTrail, animated} from 'react-spring'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import withStyles from './styles';

interface HeaderProps {
  allUsers: any[];
  classes: any;
}

const ChatHeader: React.FunctionComponent<HeaderProps> = ({ allUsers, classes }) => {

  const config = { mass: 5, tension: 2000, friction: 200 };

  const usersLength = allUsers ? allUsers.length : 0;
  const [trail] = useTrail(usersLength, () => ({
    config,
    to: { opacity: 1, height: 40 },
    from: { opacity: 0, height: 0 },
  }))

  return (
    <Container className={classes.chatHeader}>
      {trail.map((styleRest: any, index: number) => {
        const { _id, firstName, avatar } = allUsers[index];

        return (
          <animated.div
            key={_id}
            className="trails-text"
            style={{ ...styleRest }}>
            <Avatar
              className={classes.avatar}
              alt={firstName}
              src={avatar}
            />
          </animated.div>
        )
      })}
    </Container>
  );
};

export default withStyles(ChatHeader);
