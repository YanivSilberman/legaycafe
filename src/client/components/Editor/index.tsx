import * as React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import useStyles from './styles';
import plugins, { emojiPlugin } from './plugins';

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

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

  const editorRef = React.useRef(null);

  return (
    <div className={classes.footerSubsection}>
      <div className={classes.container}>
        <div className={classes.emojiSelect}>
          <EmojiSelect />
        </div>
        <div className={classes.editorContainer} onClick={() => editorRef.current.focus()}>
          <Editor
            editorState={editorState}
            onChange={s => setEditorState(s)}
            plugins={plugins}
            placeholder="Write message here..."
            onFocus={onFocus}
            onBlur={onBlur}
            ref={editorRef}
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
