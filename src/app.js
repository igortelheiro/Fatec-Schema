import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from './components/AppBar/appbar';
import Welcome from './components/welcome';
import Login from './components/Login/login';
import Userdata from './components/userdata'

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
            this.routePage( Welcome )
            fs.writeFileSync(fName, "[files checked]")
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
        const {auth} = this.state

        return (
            <div>
              <Dialog fullScreen={Boolean("true")} open={Boolean("true")}>
                  <DialogTitle style={{padding: 0}}>
                      <AppBar
                        mainApp={this}
                        cPage={CurrentPage}
                        auth={auth}
                      />
                  </DialogTitle>

                  <DialogContent className={'mainContent'}>
                      <Router>
                          <Route component={() =>
                              <CurrentPage
                                mainApp={this}
                                auth={auth}
                              />}
                          />
                      </Router>
                  </DialogContent>
              </Dialog>
            </div>
        );
    }
}
