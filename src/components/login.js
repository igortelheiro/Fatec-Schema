import React from 'react';
import TextField from '@material-ui/core/TextField';
import Register from './register';
//import EyeIcon from '@material-ui/icons/Visibility';

import AppButton from './app-button';
import App from '../app';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        data: Array(),
        email: '', 
        password: '',
        value: ''
    }
  }

  onClickSubmit = (e) => {
    this.state.data.push({ list: [this.state.email, this.state.password] } )
    this.setState({email: '', password: ''})
    e.preventDefault();
    console.log(this.state.data)
    console.log(App);
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
                id="email" value={this.state.email}
                label="email" onChange={() => {this.onTextChange(event)}}
            /><br />

            <TextField
                required
                id="password" type='password' value={this.state.password}
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


        <AppButton onClick={() => {App}}>Ainda não possui uma conta?</AppButton>
      </div>
    )
  }
}