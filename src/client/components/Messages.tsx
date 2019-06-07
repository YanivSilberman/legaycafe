import * as React from 'react';
import moment from "moment";
import { Sticky, StickyContainer } from "react-sticky";
import { compose, withApollo } from 'react-apollo';
import { Events, Element, animateScroll as scroll, scroller } from 'react-scroll'
import { Trail } from 'react-spring/renderprops'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
    boxShadow: customTheme.shadow
    color: "#fff"
  },
  avatar: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 0
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
  },
  snack: {
    bottom: '150px !important',
    '& div.MuiTypography-root': {
      background: customTheme.snack,
      color: '#333'
    }
  }
}));

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
  const [isNewMessages, setIsNewMessages] = React.useState(false);

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

  const prev = usePrevious({messages});

  React.useEffect(() => {
    if (prev && prev !== null) {
      const prevLastMsg = prev.messages[prev.messages.length - 1];
      const currLastMsg = messages[messages.length - 1];

      if (prevLastMsg._id !== currLastMsg._id && currLastMsg.user !== userId) {
        // new message son
        setIsNewMessages(true);
      }
    }
  }, [{messages}])

  React.useEffect(() => {
    if (isNewMessages) {
      setTimeout(() => {
        setIsNewMessages(false);
      }, 3000);
    }
  }, [{isNewMessages}])

  const handleInfiniteScroll = e => {
    if (e.target.scrollTop < scrollPosition) {
      // moving up
      if (e.target.scrollTop <= 400 && isMoreMessages && !fetchingMessages) {
        // fetch more messages
        setFetchingMessages(true);
      }
    } else {
      setTimeout(() => {
        setScrollPosition(e.target.scrollTop)
      }, 1000)
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
              <StickyContainer>
                <Sticky topOffset={80}>
                {({ style }) => (
                  <img
                    style={{
                      ...style,
                      width: 40,
                      height: 40,
                      borderRadius: '50%'
                    }}
                    src={users[user].avatar}
                  />
                )}
                </Sticky>
              </StickyContainer>
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
      <Snackbar
        variant="info"
        autoHideDuration={6000}
        className={classes.snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`${'bottom'},${'center'}`}
        open={isNewMessages}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={(
          <span>New Message Below</span>
        )}
        action={[
          (
            <IconButton
              onClick={() => {
                setIsNewMessages(false);
                return scroller.scrollTo('scrollTarget', {
                  duration: 1000,
                  smooth: true,
                  containerId: 'scrollContainer'
                })
              }}
            >
              <Icon>vertical_align_bottom</Icon>
            </IconButton>
          )
        ]}
      />
    </Container>
  ) || null;
};

export default compose(withApollo, withTyping, withMessages)(Messages);
