import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from './components/AppBar/appbar';
import Welcome from './components/welcome';
import Login from './components/Login/login';

const fs = require('fs')
const fName = "./schema.ini"

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: Login,
            userdata: {
              auth: true,
              name: 'Igor',
              birthdata: {dia: 17, mes: 12, ano: 2000, idade: 19},
              avatar: 'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/03/Avatar.jpg',
              exp: null,
              email: 'igortelheiro@hotmail.com',
            }
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
        const Userdata = this.state.userdata

        return (
            <div>
                <Dialog fullScreen={Boolean("true")} open={Boolean("true")}>
                    <DialogTitle style={{padding: 0}}>
                        <AppBar
                            mainApp={this}
                            cPage={CurrentPage}
                            userdata={Userdata}
                        />
                    </DialogTitle>

                    <DialogContent className={'mainContent'}>
                        <Router>
                            <Route component={() =>
                                <CurrentPage
                                    mainApp={this}
                                    userdata={Userdata}
                                />}
                            />
                        </Router>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
