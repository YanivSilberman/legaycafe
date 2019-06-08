import { makeStyles } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default makeStyles(theme => ({
  chatHeader: {
    width: '100%',
    height: 70,
    padding: theme.spacing(3, 5),

    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 20,
    display: 'inline-block'
  },
  buttonContainer: {
    flex: 1,
    textAlign: 'right'
  },
  button: {
    color: customTheme.blue
  }
}));
