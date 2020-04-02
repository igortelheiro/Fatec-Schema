import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
//import EyeIcon from '@material-ui/icons/Visibility';

import AppButton from '../AppBar/app-button'
import Register from './register';
import RouterButton from '../Tools/routerButton'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        data: [],
        email: '', 
        password: '',
    }
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    this.state.data.push( [this.state.email, this.state.password] )
    this.setState({email: '', password: ''})
    console.log(this.state.data)
  }

  onTextChange = (e) => {
    // SetState com nome dinamico
    const {id, value} = e.target
    this.setState({[id]: value})
  }

  render(){
    return (
      <div style={{margin: 4}}>
        <h2>Seja sempre bem-vindo!</h2>
        
        <form onSubmit={() => {this.onClickSubmit(event)}}>
          <div style={{display: 'inline-block', margin: 10}}>
            <Grid container spacing={4} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus={true}
                  required
                  id="email"
                  label="email"
                  value={this.state.email}
                  onChange={() => {this.onTextChange(event)}}
                /><br />
              </Grid>
            </Grid>

            <Grid container spacing={4} alignItems="flex-end">
              <Grid item>
                <Lock />
              </Grid>
              <Grid item>
                <TextField
                required
                id="password" type='password'
                label="senha"
                value={this.state.password}
                onChange={() => {this.onTextChange(event)}}
                //trailingicon={<i className='material-icons'>visibility</i>}   {{{{{{{TODO}}}}}}}
                /><br />
              </Grid>
            </Grid>
          </div>

          <div>
            <AppButton type="submit" size="large">
                ENTRAR
            </AppButton>
          </div>
        </form><br />

        
        <RouterButton mainApp={this.props.mainApp} txt={"Ainda não possui uma conta?"} page={Register} />
        <AppButton onClick={() => this.props.setAuth(!this.props.auth)}>Toogle Auth</AppButton>
      </div>
    )
  }
}