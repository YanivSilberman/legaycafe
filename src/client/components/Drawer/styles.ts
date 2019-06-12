import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export const drawerWidth = 240;
export const mobileWidth = 80;

export default comp => withStyles({
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
    height: '100vh',
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    padding: '24px 40px'
  },
  mobilePaper: {
    width: mobileWidth,
    height: '100vh',
    padding: '14px 14px'
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
      fontWeight: 600
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
    wrap: 'flex-wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 100,

    '& div': {
      margin: 5
    }
  },
  mobileAvatars: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

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
})(comp);
