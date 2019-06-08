import { makeStyles } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

const drawerWidth = 0;

export default makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
      minHeight: 100,
      maxHeight: 100,
      width: '100%'
    },
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
    },
    content: {
      flex: 1,
      backgroundColor: theme.palette.background.default,
      padding: 0,
      margin: 0,
      maxHeight: '100vh',
      minHeight: '100vh',
      maxWidth: 1000,
      display: 'flex',
      flexDirection: 'column'
    },
  })
});
