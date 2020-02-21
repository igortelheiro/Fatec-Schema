import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Register from './register';
import EyeIcon from '@material-ui/icons/Visibility';

import AppButton from './app-button'

export default class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        data: Array(),
        username: '',
        email: '', 
        birthday: '',
        password: '',
        passwordcheck: '',
        value: ''
    }
  }

  onClickSubmit = (e) => {
    this.state.data.push({ list: [this.state.email, this.state.password] } )
    this.setState({email: '', password: ''})
    e.preventDefault();
    console.log(this.state.data);
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
          <TextField
                required
                id="username" value={this.state.username}
                label="username" onChange={() => {this.onTextChange(event)}}
            /><br />
            
            <TextField
                required
                id="email" value={this.state.email}
                label="email" onChange={() => {this.onTextChange(event)}}
            /><br />

            <TextField
                required
                id="birthday" value={this.state.birthday}
                label="birthday" onChange={() => {this.onTextChange(event)}}
            /><br />

            <TextField
                required
                id="password" type='password' value={this.state.password}
                label="senha" onChange={() => {this.onTextChange(event)}}
                //trailingicon={<i className='material-icons'>visibility</i>}   {{{{{{{TODO}}}}}}}
            /><br />

            <TextField
                required
                id="passwordcheck" type='password' value={this.state.passwordcheck}
                label="senha" onChange={() => {this.onTextChange(event)}}
                //trailingicon={<i className='material-icons'>visibility</i>}   {{{{{{{TODO}}}}}}}
            /><br />
          </div>

          <div style={{display: 'inline-block'}}>
            <AppButton type="submit" size="large">
                ENTRAR
            </AppButton>
          </div>
        </form><br />


        <AppButton>Ainda não possui uma conta?</AppButton>
      </div>
    )
  }
}