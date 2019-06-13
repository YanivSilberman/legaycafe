import * as React from 'react';
import {useTrail, animated} from 'react-spring';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';

import LinearProgress from '@material-ui/core/LinearProgress';

import DndBox from '../DndBox';

import withStyles from './styles';
import { withTyping } from '../../store/hoc/queries';

interface HeaderProps {
  loading: boolean;
  users: any;
  selectUsers: any[];
  classes: any;
  chat: string;
  usersTyping: any;
  subscribeToUserTyping: () => void;
}

const ChatHeader: React.FunctionComponent<HeaderProps> = ({
  loading,
  users,
  selectUsers,
  classes,
  chat,
  usersTyping,
  subscribeToUserTyping,
}) => {

  React.useEffect(() => {
    this.subscription = subscribeToUserTyping()
  }, []);

  React.useEffect(() => {
    if (this.subscription) {
      this.subscription();
    }
    this.subscription = subscribeToUserTyping();
  }, [chat]);

  const usersLength = selectUsers ? selectUsers.length : 0;
  const [trail] = useTrail(usersLength, () => ({
    config: { mass: 5, tension: 2000, friction: 200 },
    to: { opacity: 1, height: 40 },
    from: { opacity: 0, height: 0 },
  }))

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
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
                {(!loading && usersTyping) && usersTyping.find(i => i._id === _id) && (
                  <LinearProgress
                    className={classes.typingIndicator}
                  />
                ) || null}
              </animated.div>
            )
          })
         : null}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(withTyping(ChatHeader));
