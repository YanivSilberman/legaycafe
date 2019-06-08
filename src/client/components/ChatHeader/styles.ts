import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  chatHeader: {
    width: '100%',
    height: 70,
    padding: '3px 5px',

    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 20,
    display: 'inline-block'
  }
})(comp);
