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
import GameIcon from '@material-ui/icons/PlayArrow';
import RankIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ConfigIcon from '@material-ui/icons/Settings';
import Exit from '@material-ui/icons/ExitToApp';

import Welcome from '../welcome';
import Login from '../Login/login';
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
    padding: '0 15px 0 0'
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
        
        <MenuItem onClick={() => {handleClickOpt(Welcome)}}> <HomeIcon style={ menuIcon }/> Bem-Vindo </MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Login)}}> <LoginIcon style={ menuIcon }/> Login </MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Game)}}> <GameIcon style={ menuIcon }/> Jogo </MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Ranking)}}> <RankIcon style={ menuIcon }/> Ranking </MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleClickOpt(About)}}> <InfoIcon style={ menuIcon }/> Sobre... </MenuItem>
        {/*   <MenuItem onClick={() => {}}> Config <ConfigIcon style={ menuIcon }/> </MenuItem>   */}
        <MenuItem onClick={() => {}}> <Exit style={ menuIcon }/> Sair </MenuItem>
        
      </Menu>
    </div>
  );
}