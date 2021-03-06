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

import { withMessages } from '../../store/hoc/queries';

import ChatFooter from '../ChatFooter';
import Message from '../Message';

import withStyles from './styles';
import { usePrevious, isPrev } from '../../lib/hooks';

interface MessagesProps {
  messages: Message[];
  usersTyping: User[];
  subscribeToNewMessages: () => any;
  isMoreMessages: boolean;
  moreMessages: (length: number, cb: any) => any;
  loading: boolean;
  userId: string;
  client: any;
  users: any;
  classes: any;
  chat: string;
}

const Messages: React.FunctionComponent<MessagesProps> = ({
  messages,
  subscribeToNewMessages,
  isMoreMessages,
  moreMessages,
  loading,
  userId,
  client,
  users,
  classes,
  chat
}) => {
  const [fetchingMessages, setFetchingMessages] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  // const [isNewMessages, setIsNewMessages] = React.useState(false);

  // componentDidMount
  React.useEffect(() => {
    this.subscription = subscribeToNewMessages();

    scroller.scrollTo('scrollTarget', {
      duration: 5000,
      smooth: true,
      containerId: 'scrollContainer'
    })
  }, []);

  React.useEffect(() => {
    if (this.subscription) {
      this.subscription();
    }

    this.subscription = subscribeToNewMessages();
  }, [chat])

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

  const prev = usePrevious({ messages, chat }) as any;

  const handleInfiniteScroll = e => {
    if (e.target.scrollTop % 50 === 0) {
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
    config: { mass: 1, tension: 5000, friction: 200 },
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
                style={{ ...rest, marginTop: index === 0 && 160 }}
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
          <ChatFooter
            userId={userId}
            chat={chat}
            isEmpty={messagesLength === 0}
          />
          <Element
            name="scrollTarget"
            ref={scrollTarget => { this.scrollTarget = scrollTarget; }}
          />
        </LazyLoad>
      )}
    </Container>
  );
};

/*
React.useEffect(() => {

  if (messages && chat) {
    if (isPrev(prev)(['messages', 'chat'])) {
      const prevLastMsg = prev && prev.messages[prev.messages.length - 1];
      const currLastMsg = messages[messages.length - 1];
      if (currLastMsg && prev.chat === chat) {
        if (prevLastMsg._id !== currLastMsg._id && currLastMsg.user !== userId) {
          console.log({ messages, chat, prev, currLastMsg , prevLastMsg})
          // new message son
          setIsNewMessages(true);
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
*/

export default compose(withStyles, withApollo, withMessages)(Messages);
