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

import { withCreateMessage, withToggleTyping } from '../../store/hoc/mutations';

interface FooterProps {
  classes: any;
  waitingOnMessage: boolean;
  userId: string;
  chat: string;
  createMessageMutation: (variables: {
    text: string
    userId: string
  }, cb: any) => Promise<void>;
  toggleUserTypingMutation: (variables: {
    _id: string
    isTyping: boolean
  }) => Promise<void>;
  setIsWaitingOnMessage: (isWaiting:boolean) => void;
}

const ChatFooter: React.FunctionComponent<FooterProps> = ({
  waitingOnMessage,
  userId,
  createMessageMutation,
  toggleUserTypingMutation,
  setIsWaitingOnMessage,
  classes,
  chat
}) => {
  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

  React.useEffect(() => {
     if (waitingOnMessage) {
       // just sent message
       const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

       createMessageMutation({ chat, text, userId }, () => {
         setIsWaitingOnMessage(false);
         setEditorState(EditorState.createEmpty());

         scroller.scrollTo('scrollTarget', {
           duration: 1000,
           smooth: true,
           containerId: 'scrollContainer'
         })
       })
     }
  }, [{waitingOnMessage}]);

  const sendMessage = () => {
    if (!waitingOnMessage && editorState.getCurrentContent().hasText()) {
      setIsWaitingOnMessage(true);
    }
  }

  return (
    <Container className={classes.chatFooter}>
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
        onFocus={() => toggleUserTypingMutation({chat, _id:userId, isTyping:true})}
        onBlur={() => toggleUserTypingMutation({chat, _id:userId, isTyping:false})}
      />
      <Fab
        onClick={sendMessage}
        color="primary"
        aria-label="Add"
        className={classes.button}
        disabled={waitingOnMessage}
      >
        <Icon className={classes.rightIcon}>send</Icon>
      </Fab>
    </Container>
  );
};


export default compose(withStyles, withCreateMessage, withToggleTyping)(ChatFooter);
