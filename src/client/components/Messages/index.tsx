import * as React from 'react';
import moment from "moment";
import { compose, withApollo } from 'react-apollo';
import { Events, Element, animateScroll as scroll, scroller } from 'react-scroll'
import { Trail } from 'react-spring/renderprops'
import {useTrail, animated} from 'react-spring'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import LazyLoad from 'react-lazyload';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withMessages, withTyping } from '../../store/hoc/queries';

import Editor from '../Editor';
import Message from '../Message';

import withStyles from './styles';

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface MessagesProps {
  messages: Message[];
  waitingOnMessage: boolean;
  usersTyping: User[];
  subscribeToNewMessages: () => any;
  subscribeToUserTyping: () => any;
  isMoreMessages: boolean;
  moreMessages: (length: number, cb: any) => any;
  loading: boolean;
  userId: string;
  client: any;
  users: any;
  classes: any;
}

const Messages: React.FunctionComponent<MessagesProps> = ({
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
  users,
  classes
}) => {

  const [fetchingMessages, setFetchingMessages] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isNewMessages, setIsNewMessages] = React.useState(false);

  // componentDidMount
  React.useEffect(() => {
    subscribeToNewMessages();
    subscribeToUserTyping();

    scroller.scrollTo('scrollTarget', {
      duration: 5000,
      smooth: true,
      containerId: 'scrollContainer'
    })
  }, []);

  // if fetching new messages
  React.useEffect(() => {
    if (fetchingMessages) {
      setTimeout(() => {
        moreMessages(messages.length, () => {
          setFetchingMessages(false);
        });
      }, 1000);
    }
  }, [{fetchingMessages}]);

  const prev = usePrevious({messages}) as any;

  React.useEffect(() => {
    if (messages) {
      if (prev !== undefined) {
        if (prev.messages) {
          if (prev.messages.length > 0) {
            const prevLastMsg = prev && prev.messages[prev.messages.length - 1];
            const currLastMsg = messages[messages.length - 1];

            if (prevLastMsg._id !== currLastMsg._id && currLastMsg.user !== userId) {
              // new message son
              setIsNewMessages(true);
            }
          }
        }
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
    if (e.target.scrollTop % 50 === 0) { //
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
  }

  // prepare animation
  const messagesLength = messages ? messages.length : 0;
  const [trail] = useTrail(messagesLength, () => ({
    config: { mass: 5, tension: 2000, friction: 200 },
    to: { marginLeft: 0, opacity: 1 },
    from: { marginLeft: 20, opacity: 0 }
  }))

  return (
    <Container
      className={classes.messages}
      id="scrollContainer"
      onScroll={handleInfiniteScroll}
    >
      {(loading || !messages) ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <LazyLoad offset={100} scroll unmountIfInvisible>
          {!isMoreMessages && (
            <Typography className={classes.top} component="h5">
              Top of conversation
            </Typography>
          )|| null}
          {trail.map(({ ...rest }, index) => {
            const msg = messages[index];
            return (
              <animated.div
                key={msg._id}
                className={`${classes.messageContainer} ${(msg.user === userId) && classes.ownMessageContainer}`}
                style={{ ...rest }}
              >
                <Message
                  index={index}
                  userId={userId}
                  lastUser={index > 0 && messages[index-1].user}
                  avatar={users[msg.user].avatar}
                  {...msg}
                />
              </animated.div>
            )
          })}
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
        </LazyLoad>
      )}
    </Container>
  );
};

export default compose(withStyles, withApollo, withTyping, withMessages)(Messages);
