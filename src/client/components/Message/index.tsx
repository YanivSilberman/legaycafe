import * as React from 'react';
import moment from "moment";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';
import Editor from '../Editor';

const Message: React.FunctionComponent<{
  index: number;
  user: string;
  userId: string;
  lastUser: string;
  avatar: string;
  text: string;
  createdAt: string;
}> = ({ index, user, userId, lastUser, avatar, text, createdAt }) => {
  const classes = useStyles();

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
        <Typography component="p">
          <Editor readOnly text={text} />
        </Typography>
      </Paper>
      <span className={classes.date}>
        {moment(parseInt(createdAt)).fromNow()}
      </span>
    </>
  );
};

export default Message;
