import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import CropSquare from '@material-ui/icons/CropSquare';
import FilterNone from '@material-ui/icons/FilterNone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar'
// import AccountCircle from '@material-ui/icons/AccountCircle';
import ProfileIcon from '@material-ui/icons/AccountBoxRounded';
import ConfigIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp'
import PlayIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider'

import AppMenu from './app-menu';
import Profile from '../Profile/profile'
import ConfDialog from '../Tools/confDialog'
import Welcome from '../welcome'
import Game from '../game'
import Config from '../app-config'

// Captura janela principal do Electron
const { remote } = require('electron')
var window = remote.getCurrentWindow()

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  }
}));

export default function AppBar(props) {
  const {mainApp, cPage, userdata} = props
  const [auth, setAuth] = useState(userdata.auth)
  const [maximizeIcon, setMaximizeIcon] = useState(<CropSquare/>)
  const [anchorEl, setAnchorEl] = useState(null)
  const [userMenu, setUserMenu] = useState(false)
  const [confDialog, setConfDialog] = useState(null)

  useEffect(() => {
    setAuth(userdata.auth)
  }, [userdata.auth])

  // Evento de click no botao [Maximize]
  const maximizeButton = () => {
    if ( window.isMaximized() )
        window.restore()
    else
        window.maximize()
}
  // Evento de resize da janela principal
  useEffect(() => {
    // Evento de resize da janela principal
    // Controlo aqui a troca do icone [Maximize]
    window.addListener("resize", () => {
        if ( window.isMaximized() )
            setMaximizeIcon( <FilterNone/> )
        else
            setMaximizeIcon( <CropSquare/> )
    })
  }, [])

  //USER MENU
        const handleMenu = (event) => {
          setAnchorEl( event.currentTarget )
          setUserMenu( true )
        }

        const handleClose = () => {
          setAnchorEl( null )
          setUserMenu( false )
        }

        const handleChoice = (page) => {
          handleClose()
          routePage(page)
        }

  const routePage = (page) => {
  mainApp.routePage(page)
  }

  const handleLoggout = () => {
    const choice = (bool) => { mainApp.setAuth(!bool) }
    const handleClose = () => setConfDialog( null )
    setConfDialog(
        <ConfDialog
          title="Loggout"
          msg="Tem certeza que deseja sair?"
          setChoice={choice}
          handleClose={handleClose}
        />
    )
    handleClose()
  }

  const handleExit = () => {
    const choice = (bool) => {if(bool) window.close()}
    const handleClose = () => setConfDialog( null )
    setConfDialog(
      <ConfDialog
        title="Fechar aplicativo"
        msg="Tem certeza que deseja sair?"
        setChoice={choice}
        handleClose={handleClose}
      />
    )
  }

  // Styles
  const appBarStyle = {
    WebkitAppRegion: "drag",
    zIndex: 1000,
    maxHeight: 25,
    padding: 6,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    color: "#f5f5f5",
    backgroundColor: "#4169E1",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
  }
  const appButton = {
      WebkitAppRegion: "no-drag",
      margin: 2
  }
  const appH1 = {
      margin: 0,
      marginLeft: 6,
      fontSize: 20
  }
  const menuIcon = {
      padding: '0 6px 0 0'
  }
  const avatar_style = useStyles()


  return (
    <div style={ appBarStyle }>
      <AppMenu
        mainApp={mainApp}
        cPage={cPage}
        userdata={userdata}
      />

      <Divider orientation="vertical" />


      <Tooltip title="Home" arrow>
        <IconButton onClick={() => routePage(Welcome)} style={appButton} color="inherit" size="small">
          <HomeIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" />

      <Tooltip title="Clique para jogar!" arrow>
        <IconButton onClick={() => routePage(Game)} style={appButton} color="inherit" size="small">
          <h1 style={ appH1 }> Schema </h1>
          <span style={{marginTop: 8}}><PlayIcon /></span>
        </IconButton>
      </Tooltip>

      <div style={{flexGrow: 1}} />

      {auth && (
        <div>
          <Tooltip title="Area do usuário" arrow>
            <IconButton
              style={ appButton }
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => handleMenu(e)}
              color="inherit"
              size="small"
            >
              <Avatar className={avatar_style.small} src={userdata.avatar} alt="user avatar" />
                {/* <AccountCircle /> */}
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={userMenu}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleChoice(Profile)}> <ProfileIcon style={menuIcon}/> Perfil </MenuItem>
            <MenuItem onClick={() => handleChoice(Config)}> <ConfigIcon style={menuIcon}/> Config </MenuItem>
            <MenuItem onClick={() => handleLoggout()}> <ExitIcon style={menuIcon}/> Loggout </MenuItem>
          </Menu>
        </div>
      )}

      <Divider orientation="vertical" />


      <IconButton color="inherit" size="small" style={ appButton  }
          onClick={() => { window.minimize() } }>
          <Minimize />
      </IconButton>

      <IconButton color="inherit" size="small" style={ appButton }
          onClick={() => { maximizeButton() } }>
          { maximizeIcon }
      </IconButton>

      <IconButton color="inherit" size="small" style={ appButton }
          onClick={handleExit}>
          <Close />
      </IconButton>

      {confDialog}
    </div>
  );
}
