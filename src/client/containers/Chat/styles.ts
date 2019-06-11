import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  root: {
    display: 'flex',
    minHeight: 100,
    maxHeight: 100,
    width: '100%'
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    minHeight: '100vh',
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'column',

    '& div.empty': {
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: customTheme.blue,

      '& span': {
        marginRight: 20
      }
    }
  },
})(comp);
