import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';
import { drawerWidth, mobileWidth } from '../Drawer/styles';

export default withStyles((theme:Theme) => ({
  appBar: {
    paddingTop: 30,
    background: 'transparent',
    boxShadow: theme.shadows[0],
    right: 0,
    width: `calc(100% - ${mobileWidth}px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10,
    display: 'flex'
  },
  placeholderAvatar: {
    marginRight: 20
  },
  menuButton: {
    color: '#bdbdbd',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    color: '#bdbdbd',
  },
  typingIndicator: {
    margin: '0 20px',
    backgroundColor: 'transparent',
    '& div': {
      background: customTheme.button,
    }
  }
}))
