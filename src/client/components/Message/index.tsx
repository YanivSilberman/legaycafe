import * as React from 'react';
import moment from "moment";

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import withStyles from './styles';
import Editor from '../Editor';

const Message: React.FunctionComponent<{
  index: number;
  user: string;
  userId: string;
  lastUser: string;
  avatar: string;
  text: string;
  createdAt: string;
  classes: any;
}> = ({ index, user, userId, lastUser, avatar, text, createdAt, classes }) => {

  const isCurrentUser = user === userId;

  const renderAvatar = () => !isCurrentUser && (
    <>
      {(index === 0 || lastUser !== user) ? (
        <Avatar alt={avatar} src={avatar} />
      ) : (
        <div className={classes.avatarPlaceholder} />
      )}
    </>
  ) || null;

  return (
    <>
      {renderAvatar()}
      <Paper
        className={`${classes.message} ${isCurrentUser && classes.ownMessage}`}
      >
        <Editor readOnly text={text} />
      </Paper>
      <span className={classes.date}>
        {moment(parseInt(createdAt)).fromNow()}
      </span>
    </>
  );
};

export default withStyles(Message);
