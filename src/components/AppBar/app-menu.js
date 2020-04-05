import React, { useEffect } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import MenuButton from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/LockOpen'
import GameIcon from '@material-ui/icons/PlayArrow';
import RankIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ConfigIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';

import Welcome from '../welcome';
import Login from '../Login/login';
import About from '../about';
import Game from '../game'
import Rules from '../rules';
import Ranking from '../ranking';
import LoggedOut from '../Login/loggedOut'
import ConfDialog from '../Tools/confDialog'

export default function AppMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [ExitDialog, setExitDialog] = React.useState(null)
  const { auth, cPage } = props

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  //Check auth before loading pages
  useEffect(() => {
    if (cPage == Game || cPage == Ranking) {
      if (!auth) { routePage(LoggedOut) }
    }
  }, [auth, cPage])

  function routePage(page) {
    props.mainApp.routePage(page)
  }

  function handleClickOpt(page){
    routePage(page)
    handleClose()
  }

  function handleExit() {
    const choice = (bool) => {if(bool) window.close()}
    const handleClose = () => setExitDialog(null)
    setExitDialog(
      <ConfDialog
        title="Fechar aplicativo"
        msg="Tem certeza que deseja sair?"
        setChoice={choice}
        handleClose={handleClose}
      />
    )
  }

  const appButton = {
    WebkitAppRegion: "no-drag"
  }
  const menuIcon = {
    padding: '0 15px 0 0'
  }

  return (
    <div>
      <Tooltip title="Menu principal" arrow>
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
        {!auth && <MenuItem onClick={() => {handleClickOpt(Login)}}> <LoginIcon style={ menuIcon }/> Login </MenuItem>}
        <MenuItem onClick={() => {handleClickOpt(Rules)}}> <GameIcon style={ menuIcon }/> O Jogo </MenuItem>
        <MenuItem onClick={() => {handleClickOpt(Ranking)}}> <RankIcon style={ menuIcon }/> Ranking </MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleClickOpt(About)}}> <InfoIcon style={ menuIcon }/> Sobre... </MenuItem>
        {/*   <MenuItem onClick={() => {}}> Config <ConfigIcon style={ menuIcon }/> </MenuItem>   */}
        <MenuItem onClick={handleExit}> <ExitIcon style={ menuIcon }/> Sair </MenuItem>
      </Menu>

      {ExitDialog}
    </div>
  );
}
