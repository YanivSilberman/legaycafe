import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  message: {
    maxWidth: '70%',
    padding: '1px 2px',
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
})(comp);
