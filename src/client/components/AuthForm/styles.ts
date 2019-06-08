import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
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
    margin: '2px 2px',
    padding: '1px 4px',
    background: customTheme.button
  }
})(comp);
