import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  chatFooter: {
    width: '100%',
    minHeight: 130,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 1,
    background: customTheme.button,
    boxShadow: customTheme.shadow,
    width: 40,
    height: 40
  },
  rightIcon: {
    marginLeft: 1
  }
})(comp);
