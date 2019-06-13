import * as React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Mutation } from 'react-apollo';

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
import { createMessageGql, toggleUserTypingGql } from '../../store/gql/mutations';

interface FooterProps {
  isEmpty: boolean;
  classes: any;
  userId: string;
  chat: string;
  toggleUserTypingMutation: (variables: {
    isTyping: boolean
  }) => Promise<void>;
  setWaitingOnMessage: (isWaiting:boolean) => void;
}

const ChatFooter: React.FunctionComponent<FooterProps> = ({
  isEmpty,
  userId,
  toggleUserTypingMutation,
  classes,
  chat
}) => {
  const [ waitingOnMessage, setWaitingOnMessage ] = React.useState(false);
  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

  return (
    <Container
      className={classes.chatFooter}
      style={{ marginTop: isEmpty && 100 }}
    >
      <Mutation mutation={createMessageGql}>
        {(createMessage, { loading, error }) => {
          if (error) {
            console.log('Fab Mutation Error', error);
            return null;
          }

          return (
            <Fab
              onClick={() => createMessage({ variables: {
                  chat,
                  userId,
                  text: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                }}).then(() => {
                  setEditorState(EditorState.createEmpty());

                  scroller.scrollTo('scrollTarget', {
                    duration: 1000,
                    smooth: true,
                    containerId: 'scrollContainer'
                  })
              })}
              color="primary"
              aria-label="Add"
              className={classes.button}
              disabled={loading || !editorState.getCurrentContent().hasText()}
            >
              <Icon className={classes.rightIcon}>add</Icon>
            </Fab>
          )
        }}
      </Mutation>
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
        onFocus={() => toggleUserTypingMutation({isTyping:true})}
        onBlur={() => toggleUserTypingMutation({isTyping:false})}
      />
    </Container>
  );
};

export default compose(withStyles, withToggleTyping)(ChatFooter);
