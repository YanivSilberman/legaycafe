import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles((theme:Theme) => ({
  messages: {
    // marginTop: 64,
    width: '100%',
    flex: 1,
    padding: theme.spacing(2, 4),
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
}))(comp);
