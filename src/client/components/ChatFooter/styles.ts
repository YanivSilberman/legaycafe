import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default makeStyles((theme: Theme) =>
  createStyles({
    chatFooter: {
      width: '100%',
      minHeight: 130,
      padding: theme.spacing(3, 5),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
      background: customTheme.button,
      boxShadow: customTheme.shadow,
      width: 40,
      height: 40
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  }),
);
