import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import CropSquare from '@material-ui/icons/CropSquare';
import FilterNone from '@material-ui/icons/FilterNone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle';
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
//import Config from '../config'

// Captura janela principal do Electron
const { remote } = require('electron')
var window = remote.getCurrentWindow()

export default class AppBar extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            maximizeIcon: <CropSquare/>,
            mainApp: props.mainApp,
            auth: props.auth,
            anchorEl: null,
            accountMenuOpen: false,
            confDialog: null,
            userAvatar: 'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/03/Avatar.jpg'
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ auth: newProps.auth })
    }

    // Evento de click no botao [Maximize]
    maximizeButton = () => {
        if ( window.isMaximized() )
            window.restore()
        else
            window.maximize()
    }

    componentDidMount = () => {
        // Evento de resize da janela principal
        // Controlo aqui a troca do icone [Maximize]
        window.addListener("resize", () => {
            if ( window.isMaximized() )
                this.setState({ maximizeIcon: <FilterNone/> })
            else
                this.setState({ maximizeIcon: <CropSquare/> })
        })
    }

    //USER MENU
        handleMenu = (event) => {
            this.setState({ anchorEl: event.currentTarget, accountMenuOpen: true })
        }

        handleClose = () => {
            this.setState({ anchorEl: null, accountMenuOpen: false })
        }

        handleChoose = (page) => {
            this.handleClose()
            this.routePage(page)
        }

    routePage = (page) => {
      this.props.mainApp.routePage(page)
    }

    handleLoggout = () => {
        const choice = (bool) => { this.props.mainApp.setAuth(!bool) }
        const handleClose = () => this.setState({ confDialog: null })
        this.setState({ confDialog:
            <ConfDialog
              title="Loggout"
              msg="Tem certeza que deseja sair?"
              setChoice={choice}
              handleClose={handleClose}
            />
        })
        this.handleClose()
    }

    handleExit = () => {
      const choice = (bool) => {if(bool) window.close()}
      const handleClose = () => this.setState({ confDialog: null})
      this.setState({confDialog:
        <ConfDialog
          title="Fechar aplicativo"
          msg="Tem certeza que deseja sair?"
          setChoice={choice}
          handleClose={handleClose}
        />
      })
    }

    render(){
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

      return (
        <div style={ appBarStyle }>
          <AppMenu
            mainApp={this.state.mainApp}
            cPage={this.props.cPage}
            auth={this.state.auth}
          />

          <Divider orientation="vertical" />


          <Tooltip title="Home" arrow>
            <IconButton onClick={() => this.routePage(Welcome)} style={appButton} color="inherit" size="small">
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip title="Clique para jogar!" arrow>
            <IconButton onClick={() => this.routePage(Game)} style={appButton} color="inherit" size="small">
              <h1 style={ appH1 }> Schema </h1>
              <span style={{marginTop: 8}}><PlayIcon /></span>
            </IconButton>
          </Tooltip>

          <div style={{flexGrow: 1}} />

          {this.state.auth && (
            <div>
              <Tooltip title="Area do usuário" arrow>
                <IconButton
                  style={ appButton }
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => this.handleMenu(e)}
                  color="inherit"
                  size="small"
                >
                  <Avatar src={this.state.userAvatar} alt="user avatar" />
                    {/* <AccountCircle /> */}
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={this.state.accountMenuOpen}
                onClose={() => this.handleClose()}
              >
                <MenuItem onClick={() => this.handleChoose(Profile)}> <ProfileIcon style={menuIcon}/> Perfil </MenuItem>
                <MenuItem onClick={() => this.handleChoose(Config)}> <ConfigIcon style={menuIcon}/> Config </MenuItem>
                <MenuItem onClick={() => this.handleLoggout()}> <ExitIcon style={menuIcon}/> Loggout </MenuItem>
              </Menu>
            </div>
          )}

          <Divider orientation="vertical" />


          <IconButton color="inherit" size="small" style={ appButton  }
              onClick={() => { window.minimize() } }>
              <Minimize />
          </IconButton>

          <IconButton color="inherit" size="small" style={ appButton }
              onClick={() => { this.maximizeButton() } }>
              { this.state.maximizeIcon }
          </IconButton>

          <IconButton color="inherit" size="small" style={ appButton }
              onClick={this.handleExit}>
              <Close />
          </IconButton>

          {this.state.confDialog}
        </div>
      )
  }
}
