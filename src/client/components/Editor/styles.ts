import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  footerSubsection: {
    flex: 1,
  },
  container: {
    display: 'flex'
  },
  readContainer: {

  },
  editorContainer: {
    flex: 1,
    background: "#fff",
    border: `1px solid #bdbdbd`,
    borderRadius: 30,
    maxHeight: 300,
    minWidth: 200,
    minHeight: 50,
    margin: '0 30px',
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    overflow: "scroll",
    '& div': {
      '& div.public-DraftEditorPlaceholder-root': {
        color: "#bdbdbd",
        position: 'absolute'
      }
    }
  },
  emojiSelect: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      border: 0,
      background: 'transparent'
    }
  }
})(comp);
