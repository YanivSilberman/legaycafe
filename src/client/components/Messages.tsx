import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { Events, Element, animateScroll as scroll, scroller } from 'react-scroll'
import { Trail } from 'react-spring/renderprops'

import { withMessages, withTyping } from '../store/hoc/queries';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import customTheme from '../lib/theme';


const useStyles = makeStyles(theme => ({
  messages: {
    width: '100%',
    flex: 1,
    padding: theme.spacing(3, 5),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll'
  },
  messageContainer: {
    width: '100%',
    minHeight: 40,
    marginBottom: 15,
    display: 'flex'
  }
  ownMessageContainer: {
    flexDirection: 'row-reverse'
  },
  message: {
    maxWidth: '70%',
    padding: theme.spacing(1, 2),
    textAlign: 'left',
    margin: '0 10px'
  },
  ownMessage: {
    background: customTheme.button,
    color: "#fff"
  },
  avatar: {

  },
  isTyping: {
    marginTop: 20
  }
}));

const Messages: React.FunctionComponent<{
  messages: [];
  usersTyping: [];
}> = ({
  messages,
  usersTyping,
  subscribeToNewMessages,
  subscribeToUserTyping,
  loading,
  userId,
  client,
  users
}) => {
  if (loading) return 'loading messages...';

  const classes = useStyles();

  React.useEffect(() => {
    subscribeToNewMessages();
    subscribeToUserTyping();
  }, []);

  /*
  position: 'relative',
  height: '200px',
  overflow: 'scroll',
  marginBottom: '100px'
  */

  return messages && (
    <Container className={classes.messages}>
      <Element
        name="scrollContainer"
        id="scrollContainer"
      >
        <Trail
          items={messages}
          keys={message => message._id}
          from={{ marginBottom: 50, opacity: 0 }}
          to={{ marginBottom: 20, opacity: 1 }}
        >
          {({ id, text, user }) => styleProps => (
            <div
              style={styleProps}
              className={`${classes.messageContainer} ${(user === userId) && classes.ownMessageContainer}`}
            >
              <Avatar className={classes.avatar} alt={users[user].avatar} src={users[user].avatar} />
              <Paper
                key={id}
                className={`${classes.message} ${(user === userId) && classes.ownMessage}`}
              >
                <Typography component="p">
                  {text}
                </Typography>
              </Paper>
            </div>
          )}
        </Trail>
          {usersTyping && usersTyping.length > 0 && (
            <Typography component="p" className={classes.isTyping}>
              {usersTyping.map(u => users[u._id].firstName).join(", ")}
              {usersTyping.length === 1 ? ` is ` : ` are `}
              typing ...
            </Typography>
          ) || null}
        </Element>
      </Container>
  ) || null;
};

export default compose(withApollo, withTyping, withMessages)(Messages);
