import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';
import { drawerWidth } from '../Drawer/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    background: '#fff',
    boxShadow: theme.shadows[0],
    right: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  avatar: {
    marginRight: 20,
    display: 'inline-block'
  },
  menuButton: {
    color: '#bdbdbd',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
}));

export default Comp => props => {
  const classes = useStyles(props);
  return <Comp classes={classes} {...props} />;
}
