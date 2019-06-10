import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export const drawerWidth = 240;

export default comp => withStyles({
  drawer: {
    width: drawerWidth,
    minWidth: drawerWidth,
    maxWidth: drawerWidth,
    height: '100vh',
    flex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    padding: '24px 40px'
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
  avatars: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    wrap: 'flex-wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',

    '& div': {
       margin: 10
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
