import * as React from 'react';
import { compose, withApollo } from 'react-apollo';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu'

import DndBox from '../DndBox';
import DndBin from '../DndBin';

import withUsers from '../../store/hoc/'
import withStyles from './styles';

interface ChatDrawerProps {
  allUsers: object[];
  avatar: string;
  firstName: string;
  lastName: string;
  client: any;
  classes: any;
  onDrop: (item:any) => void;
}

const ChatDrawer: React.FunctionComponent<ChatDrawerProps> = ({
  allUsers,
  avatar,
  firstName,
  lastName,
  client,
  classes,
  onDrop
}) => {

  const logout = () => {
    localStorage.removeItem('token');
    client.resetStore();
  }

  const content = ({ avatarsClass, mainAvatarClass }: any) => (
    <>
      <div className={mainAvatarClass}>
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
      <DndBin accept="REMOVER" onDrop={onDrop} style={avatarsClass}>
        {allUsers.map(({ _id, firstName, avatar }: User) => (
          <DndBox type="ADDER" key={_id} _id={_id}>
            <Avatar alt={firstName} src={avatar} />
          </DndBox>
        ))}
      </DndBin>
    </>
  )

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.mobileDrawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.mobilePaper }}
          ModalProps={{ keepMounted: true }}
        >
          {content({
            avatarsClass: classes.mobileAvatars,
            mainAvatarClass: classes.mobileMainAvatar
          })}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open
        >
          {content({
            avatarsClass: classes.avatars,
            mainAvatarClass: classes.mainAvatar
          })}
        </Drawer>
      </Hidden>
    </>
  );
};

export default withStyles(withApollo(ChatDrawer));
