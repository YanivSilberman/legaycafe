import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import customTheme from '../lib/theme';

const useStyles = makeStyles(theme => ({
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh'
  },
  progress: {
    color: customTheme.blue,
  }
}));

const Spinner: React.FunctionComponent<> = () => {
  const classes = useStyles();

  return (
    <div className={classes.progressContainer}>
      <CircularProgress color="primary" className={classes.progress} />
    </div>
  );
};

export default Spinner;
