import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';
import { drawerWidth } from '../../components/Drawer/styles';

export default comp => withStyles((theme:Theme) => ({
  chatFooter: {
    minHeight: 130,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing(0, 2),
    background: customTheme.button,
    boxShadow: customTheme.shadow,
    width: 30,
    height: 30,
    minHeight: 30,

    '& span': {
      fontSize: 14,
    }
  },
  rightIcon: {
    marginLeft: 1
  }
}))(comp);

/*
fixed traditional footer ---


chatFooter: {
  backgroundColor: 'rgba(255, 255, 255, .55)',
  backdropFilter: 'blur(25px)',
  boxShadow: theme.shadows[2],
  minHeight: 130,
  padding: '2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  bottom: 0,
  right: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
},
button: {
  margin: 1,
  background: customTheme.button,
  boxShadow: customTheme.shadow,
  width: 40,
  height: 40
},
rightIcon: {
  marginLeft: 1
}
*/
