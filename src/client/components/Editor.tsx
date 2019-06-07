import * as React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { makeStyles } from '@material-ui/core/styles';

import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';

import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

import customTheme from '../lib/theme';

const linkifyPlugin = createLinkifyPlugin();
const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const plugins = [
  linkifyPlugin,
  emojiPlugin
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  readContainer: {

  },
  editorContainer: {
    borderBottom: `1px solid #bdbdbd`,
    maxWidth: 400,
    minWidth: 200,
    minHeight: 50,
    margin: '0 30px'
  }
}));

const LegayEditor: React.FunctionComponent<> = ({
  editorState,
  setEditorState,
  onFocus,
  onBlur,
  readOnly,
  text
}) => {
  const classes = useStyles();

  if (readOnly) {
    return (
      <div className={classes.readContainer}>
        <Editor
          readOnly
          editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(text)))}
          plugins={plugins}
        />
      </div>
    )
  }

  return (
    <div>
      <div className={classes.container}>
        <EmojiSelect />
        <div className={classes.editorContainer}>
          <Editor
            editorState={editorState}
            onChange={s => setEditorState(s)}
            plugins={plugins}
            placeholder="Write message here..."
            onFocus={onFocus}
            onBlue={onBlur}
          />
        </div>
      </div>
      <div className={classes.options}>
        <EmojiSuggestions />
      </div>
    </div>
  );
};

export default LegayEditor;
