import { makeStyles } from '@material-ui/core/styles';

import customTheme from '../../lib/theme';

export default makeStyles(theme => ({
  message: {
    maxWidth: '70%',
    padding: theme.spacing(1, 2),
    textAlign: 'left',
    margin: '0 10px'
  },
  ownMessage: {
    background: customTheme.button,
    backgroundAttachment: 'absolute',
    boxShadow: customTheme.shadow,
    color: "#fff"
  },
  avatar: {
  },
  avatarPlaceholder: {
    width: 40
  },
}));
