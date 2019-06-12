import * as React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import { compose } from 'react-apollo';
import { scroller } from 'react-scroll'

import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import Editor from '../Editor';
import withStyles from './styles';

import { usePrevious } from '../../lib/hooks';
import { withCreateMessage, withToggleTyping } from '../../store/hoc/mutations';

interface FooterProps {
  isEmpty: boolean;
  classes: any;
  userId: string;
  chat: string;
  createMessageMutation: (variables: {
    text: string
    userId: string
  }, cb: any) => Promise<void>;
  toggleUserTypingMutation: (variables: {
    isTyping: boolean
  }) => Promise<void>;
  setWaitingOnMessage: (isWaiting:boolean) => void;
}

const ChatFooter: React.FunctionComponent<FooterProps> = ({
  isEmpty,
  userId,
  createMessageMutation,
  toggleUserTypingMutation,
  classes,
  chat
}) => {
  const [ waitingOnMessage, setWaitingOnMessage ] = React.useState(false);
  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

  const prev = usePrevious({waitingOnMessage}) as any;

  React.useEffect(() => {
    if (waitingOnMessage) {
      if (prev) {
        if (!prev.waitingOnMessage) {
          // just sent message
          const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            setTimeout(() => {
             createMessageMutation({ text, userId }, () => {
               setWaitingOnMessage(false);
               setEditorState(EditorState.createEmpty());

               scroller.scrollTo('scrollTarget', {
                 duration: 1000,
                 smooth: true,
                 containerId: 'scrollContainer'
               })
             })
          }, 1000);
        }
      }
    }
  }, [{waitingOnMessage}]);

  const sendMessage = () => {
    if (!waitingOnMessage && editorState.getCurrentContent().hasText()) {
      setWaitingOnMessage(true);
    }
  }

  return (
    <Container
      className={classes.chatFooter}
      style={{ marginTop: isEmpty && 100 }}
    >
      <Fab
        onClick={() => sendMessage()}
        color="primary"
        aria-label="Add"
        className={classes.button}
        disabled={waitingOnMessage}
      >
        <Icon className={classes.rightIcon}>add</Icon>
      </Fab>
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
        onFocus={() => toggleUserTypingMutation({isTyping:true})}
        onBlur={() => toggleUserTypingMutation({isTyping:false})}
      />
    </Container>
  );
};


export default compose(withStyles, withCreateMessage, withToggleTyping)(ChatFooter);
