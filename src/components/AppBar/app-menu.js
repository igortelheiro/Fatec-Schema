import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'

import MenuButton from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/LockOpen'
import ProfileIcon from '@material-ui/icons/AccountBox';
import GameIcon from '@material-ui/icons/PlayArrow';
import RankIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ConfigIcon from '@material-ui/icons/Settings';
import Exit from '@material-ui/icons/ExitToApp'

import Welcome from '../welcome';
import Login from '../Login/login';
import Profile from '../Profile/profile';
import About from '../about';
import Game from '../game';
import Ranking from '../ranking';

export default function AppMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClickOpt(page){
    props.mainApp.routePage(page)
    handleClose()
  }

  const appButton = {
    WebkitAppRegion: "no-drag"
  }
  const menuIcon = {
    marginLeft: 'auto',
    padding: '0 0 0 6px'
  }

  return (
    <div>
      <Tooltip title="Menu principal">
          <IconButton color="inherit" size="small" style={ appButton  }
              onClick={handleClick}
              >
              <MenuButton width="28"/>
          </IconButton>
      </Tooltip>
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={() => {handleClickOpt(Welcome)}}> Bem-vindo <HomeIcon style={ menuIcon }/></MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Login)}}> Login <LoginIcon style={ menuIcon }/></MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Profile)}}> Profile<ProfileIcon style={ menuIcon }/></MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Game)}}> Game <GameIcon style={ menuIcon }/></MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Ranking)}}> Ranking <RankIcon style={ menuIcon }/> </MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleClickOpt(About)}}> Sobre... <InfoIcon style={ menuIcon }/></MenuItem>
        <MenuItem onClick={() => {}}> Configurações <ConfigIcon style={ menuIcon }/> </MenuItem>
        <MenuItem onClick={() => {}}> Sair <Exit style={ menuIcon }/> </MenuItem>
        
      </Menu>
    </div>
  );
}