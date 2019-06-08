import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default makeStyles((theme: Theme) =>
  createStyles({
    authForm: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textField: {},
    button: {
      color: '#fff',
      margin: theme.spacing(2),
      padding: theme.spacing(1, 4),
      background: customTheme.button
    }
  })
);
