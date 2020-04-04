import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from './components/AppBar/app-bar';
import Welcome from './components/welcome';
import Login from './components/Login/login';

const fs = require('fs')
const fName = "./schema.ini"

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: Login,
            auth: true
        }

        this.routePage = this.routePage.bind(this)
        this.setAuth = this.setAuth.bind(this)

        fs.exists(fName, (exists) => {
            if (!exists){
                this.setState({ currentPage: Welcome })
                fs.writeFileSync(fName, "[files checked]")
                console.log(fName + " criado com sucesso!")
            }
        });
    }

    routePage = (page) => {
        this.setState({ currentPage: page })
    }

    setAuth = (bool) => {
        this.setState({ auth: bool })
    }

    render() {
        const CurrentPage = this.state.currentPage

        return (
            <div>
                <Dialog fullScreen={Boolean("true")} open={Boolean("true")}>
                    <DialogTitle style={{padding: 0}}>
                        <AppBar
                            mainApp={this}
                            cPage={this.state.currentPage}
                            auth={this.state.auth}
                            setAuth={this.setAuth}
                        />
                    </DialogTitle>

                    <DialogContent className={'mainContent'}>
                        <Router>
                            <Route component={() =>
                                <CurrentPage
                                    mainApp={this}
                                    auth={this.state.auth}
                                    setAuth={this.setAuth}
                                />}
                            />
                        </Router>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
