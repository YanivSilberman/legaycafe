import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles((theme:Theme) => ({
  paper: {
    padding: '0.7em 1em',
    textAlign: 'left',
  },
  footerSubsection: {
    flex: 1,
    margin: '0 10px',
    maxWidth: '70%',
    minWidth: 100,
  },
  container: {
    display: 'flex',
  },
  readContainer: {

  },
  editorContainer: {
    flex: 1,
    minWidth: 100,
    minHeight: 50,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    '& div': {
      '& div.public-DraftEditorPlaceholder-root': {
        color: "#bdbdbd",
        display: 'none',
        // position: 'absolute'
      }
    },
  },
  emojiSelect: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      border: 0,
      background: 'transparent'
    }
  }
}))(comp);


/*
old ----


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
*/
