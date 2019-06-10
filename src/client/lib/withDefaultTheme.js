import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const withDefaultStyle = (styles) => Comp => props => {
  const useStyles = makeStyles((theme: Theme) => createStyles(styles(theme)));
  const classes = useStyles();
  return <Comp classes={classes} {...props} />;
}

/*
export default Comp => withDefaultStyle(theme => ({
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
}))(Compo);

*/
