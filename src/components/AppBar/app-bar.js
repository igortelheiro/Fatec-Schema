import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import CropSquare from '@material-ui/icons/CropSquare';
import FilterNone from '@material-ui/icons/FilterNone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ProfileIcon from '@material-ui/icons/AccountBoxRounded';
import ConfigIcon from '@material-ui/icons/Settings';
import Exit from '@material-ui/icons/ExitToApp'

import AppMenu from './app-menu';
import Profile from '../Profile/profile'
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
            accountMenuOpen: false
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

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget, accountMenuOpen: true })
    }

    handleChoose = (page) => {
        this.handleClose()
        this.props.mainApp.routePage(page)
    }

    handleClose = () => {
        this.setState({ anchorEl: null, accountMenuOpen: false })
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
            WebkitAppRegion: "no-drag"
        }
        const appH1 = {
            flexGrow: 1,
            margin: 0,
            marginLeft: 6,
            fontSize: 20
        }
        const menuIcon = {
            padding: '0 6px 0 0'
          }

        return ( 
            <div style={ appBarStyle }>
                <AppMenu mainApp={this.state.mainApp}/>
                <h1 style={ appH1 }> Schema </h1>

                {this.state.auth && (
                    <div>
                        <IconButton
                            style={ appButton }
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => this.handleMenu(e)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
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
                            <MenuItem /*onClick={() => this.handleChoose(Exit)}*/> <Exit style={menuIcon}/> Loggout </MenuItem>
                        </Menu>
                    </div>
                )}

                <IconButton color="inherit" size="small" style={ appButton  }
                    onClick={() => { window.minimize() } }>
                    <Minimize />
                </IconButton>

                <IconButton color="inherit" size="small" style={ appButton }
                    onClick={() => { this.maximizeButton() } }>
                    { this.state.maximizeIcon }
                </IconButton>
                
                <IconButton color="inherit" size="small" style={ appButton }
                    onClick={() => { window.close() } }>
                    <Close />
                </IconButton>
            </div> 
        )
    }
}