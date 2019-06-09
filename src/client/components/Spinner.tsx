import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import customTheme from '../lib/theme';

const Spinner: React.FunctionComponent<{
  classes: any
}> = ({ classes }) => {
  return (
    <div className={classes.progressContainer}>
      <CircularProgress color="primary" className={classes.progress} />
    </div>
  );
};

export default withStyles({
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
})(Spinner)
