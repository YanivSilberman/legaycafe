import * as React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import { compose } from 'react-apollo';
import { scroller } from 'react-scroll'

import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import Editor from '../Editor';
import useStyles from './styles';

import { withCreateMessage, withToggleTyping } from '../../store/hoc/mutations';

const ChatFooter: React.FunctionComponent<{
  createMessageMutation: function;
  toggleUserTypingMutation: function;
  userId: string;
}> = ({ waitingOnMessage, userId, createMessageMutation, toggleUserTypingMutation, setIsWaitingOnMessage }) => {
  const classes = useStyles();

  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

  React.useEffect(() => {
     if (waitingOnMessage) {
       // just sent message
       const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

       createMessageMutation({ text, userId }, () => {
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
    if (!waitingOnMessage) {
      setIsWaitingOnMessage(true);
    }
  }

  return (
    <Container className={classes.chatFooter}>
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
        onFocus={() => toggleUserTypingMutation({_id:userId, isTyping:true})}
        onBlur={() => toggleUserTypingMutation({_id:userId, isTyping:false})}
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


export default compose(withCreateMessage, withToggleTyping)(ChatFooter);
