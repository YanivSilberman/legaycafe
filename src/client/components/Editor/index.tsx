import * as React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import withStyles from './styles';
import plugins, { emojiPlugin } from './plugins';

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

interface EditorProps {
  editorState?: any;
  setEditorState?: any;
  onFocus?: any;
  onBlur?: any;
  readOnly?: boolean;
  text?: string;
  classes: any;
}

const LegayEditor: React.FunctionComponent<EditorProps> = ({
  editorState,
  setEditorState,
  onFocus,
  onBlur,
  readOnly,
  text,
  classes
}) => {
  if (readOnly) {
    return (
      <div className={classes.readContainer}>
        <Editor
          readOnly
          editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(text)))}
          plugins={plugins}
          onChange={() => null}
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

export default withStyles(LegayEditor);
