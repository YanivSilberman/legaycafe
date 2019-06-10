import * as React from 'react';

import {useTrail, animated} from 'react-spring'

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import withStyles from './styles';

interface HeaderProps {
  allUsers: any[];
  setOpenMobile: () => void;
  classes: any;
}

const ChatHeader: React.FunctionComponent<HeaderProps> = ({
  allUsers,
  setOpenMobile,
  classes
}) => {

  const usersLength = allUsers ? allUsers.length : 0;
  const [trail] = useTrail(usersLength, () => ({
    config: { mass: 5, tension: 2000, friction: 200 },
    to: { opacity: 1, height: 40 },
    from: { opacity: 0, height: 0 },
  }))

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={setOpenMobile}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
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
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(ChatHeader);
