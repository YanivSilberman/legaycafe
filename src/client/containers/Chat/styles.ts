import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';
import { mobileWidth, drawerWidth } from '../../components/Drawer/styles';

export default comp => withStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    minHeight: 100,
    maxHeight: 100,
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    minHeight: '100vh',
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${mobileWidth}px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },

    '& div.empty': {
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: customTheme.blue,

      '& span': {
        marginRight: 20
      }
    }
  },
}))(comp);
