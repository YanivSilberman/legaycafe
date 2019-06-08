import * as React from 'react';
import { compose, withApollo } from 'react-apollo';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withUsers from '../../store/hoc/'
import withStyles from './styles';

interface ChatDrawerProps {
  allUsers: object[];
  avatar: string;
  firstName: string;
  lastName: string;
  client: any;
  classes: any;
}

const ChatDrawer: React.FunctionComponent<ChatDrawerProps> = ({
  allUsers,
  avatar,
  firstName,
  lastName,
  client,
  classes
}) => {

  const logout = () => {
    localStorage.removeItem('token');
    client.resetStore();
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.mainAvatar}>
        <Avatar alt={avatar} src={avatar} />
        <Typography component="h1">
          {firstName} {lastName}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
      <Divider />
      <div className={classes.avatars}>
        {allUsers.map(({ _id, firstName, avatar }: User) => (
          <Avatar key={_id} alt={firstName} src={avatar} />
        ))}
      </div>
    </Drawer>
  );
};

export default withStyles(withApollo(ChatDrawer));
