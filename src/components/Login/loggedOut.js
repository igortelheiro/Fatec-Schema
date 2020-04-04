import React, { Component } from 'react';
import AppButton from '../AppBar/app-button'
import Login from './login'
import Sadface from '@material-ui/icons/SentimentVeryDissatisfied';

// import { Container } from './styles';

export default class LoggedOut extends Component {

  routePage = (page) => {
    this.props.mainApp.routePage(page)
  }

  render() {
    const title_style = {}

    return (
        <>
          <h3 style={title_style}>Oops..</h3>
          <p>Você precisa estar logado para acessar esta página.</p>
          <AppButton onClick={() => this.routePage(Login)}><Sadface /></AppButton>
        </>
    );
  }
}
