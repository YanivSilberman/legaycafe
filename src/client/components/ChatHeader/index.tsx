import * as React from 'react';

import {useTrail, animated} from 'react-spring'

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import DndBox from '../DndBox';

import withStyles from './styles';

interface HeaderProps {
  users: any;
  selectUsers: any[];
  setOpenMobile: () => void;
  classes: any;
}

const ChatHeader: React.FunctionComponent<HeaderProps> = ({
  users,
  selectUsers,
  setOpenMobile,
  classes
}) => {

  const usersLength = selectUsers ? selectUsers.length : 0;
  const [trail] = useTrail(usersLength, () => ({
    config: { mass: 5, tension: 2000, friction: 200 },
    to: { opacity: 1, height: 40 },
    from: { opacity: 0, height: 0 },
  }))

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={() => setOpenMobile()}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {usersLength > 0 ? trail.map((styleRest: any, index: number) => {
          const { _id, firstName, avatar } = users[selectUsers[index]];

          return (
            <animated.div
              key={_id}
              className="trails-text"
              style={{ ...styleRest }}
            >
              <DndBox type="REMOVER" _id={_id}>
                <Avatar
                  className={classes.avatar}
                  alt={firstName}
                  src={avatar}
                />
              </DndBox>
            </animated.div>
          )
        }) : (
          <>
            <Avatar className={classes.placeholderAvatar} />
            <Typography component="h6" className={classes.title}>
              Drop User Avatars Here To Chat...
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(ChatHeader);
