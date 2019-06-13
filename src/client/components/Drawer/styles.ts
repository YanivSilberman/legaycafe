import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export const drawerWidth = 240;
export const mobileWidth = 80;

export default comp => withStyles((theme:Theme) => ({
  bin: {
    padding: theme.spacing(3, 2),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  drawer: {
    width: drawerWidth,
    minWidth: drawerWidth,
    maxWidth: drawerWidth,
    height: '100vh',
    flex: 0,
  },
  mobileDrawer: {
    width: mobileWidth,
    maxWidth: mobileWidth,
    minWidth: mobileWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    padding: 0,
    width: drawerWidth,
    border: 'none',
  },
  mobilePaper: {
    padding: 0,
    width: mobileWidth,
    height: '100vh',
  },
  mainAvatar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,

    '& div.MuiAvatar-root': {
      marginBottom: 10,
      height: drawerWidth / 2,
      width: drawerWidth / 2
    },

    '& h1': {
      fontWeight: 600,
      fontSize: 20,
      color: "#707070"
    }
  },
  mobileMainAvatar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,

    '& div.MuiAvatar-root': {
      marginBottom: 10,
      height: mobileWidth / 2,
      width: mobileWidth / 2
    },

    '& h1': {
      display: 'none'
    }
  },
  avatars: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',

    '& div': {
      margin: 5
    }
  },
  mobileAvatars: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 1),

    '& div': {
      margin: 5
    }
  },
  buttonContainer: {
    flex: 1,
    textAlign: 'right'
  },
  button: {
    color: customTheme.blue
  }
}))(comp);
