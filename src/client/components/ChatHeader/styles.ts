import { withStyles } from '@material-ui/styles';

import customTheme from '../../lib/theme';

export default comp => withStyles({
  chatHeader: {
    width: '100%',
    height: 70,
    padding: '1em 2em',

    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 20,
    display: 'inline-block'
  }
})(comp);
