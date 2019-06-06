import * as React from 'react';
import moment from "moment";
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
  avatarPlaceholder: {
    width: 40
  },
  isTyping: {
    marginTop: 20
  },
  date: {
    fontSize: 10,
    marginTop: 10
  },
  top: {
    textAlign: 'center',
    marginBottom: 50,
    opacity: 0.5
  },
  skeletonMessage: {
    background: "#eeeeee"
  }
}));

const Messages: React.FunctionComponent<{
  messages: [];
  usersTyping: [];
}> = ({
  messages,
  waitingOnMessage,
  usersTyping,
  subscribeToNewMessages,
  subscribeToUserTyping,
  isMoreMessages,
  moreMessages,
  loading,
  userId,
  client,
  users
}) => {
  if (loading) return 'loading messages...';

  const classes = useStyles();

  const [fetchingMessages, setFetchingMessages] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    subscribeToNewMessages();
    subscribeToUserTyping();

    scroller.scrollTo('scrollTarget', {
      duration: 5000,
      delay: 1000,
      smooth: true,
      containerId: 'scrollContainer'
    })
  }, []);

  React.useEffect(() => {
    if (fetchingMessages) {
      setTimeout(() => {
        moreMessages(messages.length, () => {
          setFetchingMessages(false);
        });
      }, 1000);
    }
  }, [{fetchingMessages}]);

  const handleInfiniteScroll = e => {
    if (e.target.scrollTop < scrollPosition) {
      // moving up
      if (e.target.scrollTop <= 400 && isMoreMessages && !fetchingMessages) {
        // fetch more messages
        setFetchingMessages(true);
      }
    } else {
      setScrollPosition(e.target.scrollTop)
    }
  }

  return messages && (
    <Container
      className={classes.messages}
      id="scrollContainer"
      onScroll={handleInfiniteScroll}
    >
      {!isMoreMessages && (
        <Typography className={classes.top} component="h5">
          Top of conversation
        </Typography>
      )|| null}
      <Trail
        items={messages}
        keys={message => message._id}
        from={{ marginLeft: 20, opacity: 0 }}
        to={{ marginLeft: 0, opacity: 1 }}
      >
        {({ id, text, user, createdAt }, key) => styleProps => (
          <div
            style={styleProps}
            className={`${classes.messageContainer} ${(user === userId) && classes.ownMessageContainer}`}
          >
            {(key === 0 || messages[key-1].user !== user) ? (
              <Avatar className={classes.avatar} alt={users[user].avatar} src={users[user].avatar} />
            ) : (
              <div className={classes.avatarPlaceholder} />
            )}
            <Paper
              key={id}
              className={`${classes.message} ${(user === userId) && classes.ownMessage}`}
            >
              <Typography component="p">
                {text}
              </Typography>
            </Paper>
            <span className={classes.date}>
              {moment(parseInt(createdAt)).fromNow()}
            </span>
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
      <Element
        name="scrollTarget"
        ref={scrollTarget => { this.scrollTarget = scrollTarget; }}
      />
      </Container>
  ) || null;
};

export default compose(withApollo, withTyping, withMessages)(Messages);
