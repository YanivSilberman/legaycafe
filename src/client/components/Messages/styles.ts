import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  messages: {
    marginTop: 64,
    width: '100%',
    flex: 1,
    padding: '1em 2em',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll'
  },
  messageContainer: {
    width: '100%',
    minHeight: 40,
    marginBottom: 15,
    display: 'flex'
  },
  ownMessageContainer: {
    flexDirection: 'row-reverse'
  },
  isTyping: {
    marginTop: 20
  },
  date: {
    fontSize: 10,
    marginTop: 10
  },
  top: {
    textAlign: 'center',
    marginBottom: 50,
    opacity: 0.5
  },
  skeletonMessage: {
    background: "#eeeeee"
  },
  snack: {
    bottom: '150px !important',
    '& div.MuiTypography-root': {
      background: customTheme.snack,
      color: '#333'
    }
  },
  progress: {
    backgroundColor: 'transparent',
    '& div': {
      background: customTheme.button,
    }
  }
})(comp);
