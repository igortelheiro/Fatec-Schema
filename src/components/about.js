import React from 'react';
import MsgDialog from '../components/dialog'
import { link } from 'fs';

export default class About extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        dialog: null,
    }
  }
  
  openDialog = (title, message) => {
    this.setState({ dialog: <MsgDialog title={title} message={message} changeStatus={this.closeDialog} /> })
  }
  closeDialog = () => {
    this.setState({ dialog: null })
  }

  render() {
    
    const appName = require('../../package.json').name
    const appDescription = require('../../package.json').description
    const appVersion = require('../../package.json').version
    const appLicense = require('../../package.json').license

    const styleLink = {
      color: 'blue',
      cursor: 'pointer'
    }

    const licenseTitle = "MIT License"
    const licenseMessage = 
      <span>
        Copyright (c) 2019
        <br /><br />
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the 'Software'), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        <br /><br />
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software."
      </span>
    
    return (
      <div>
        <h2>Conheça-nos</h2>
        <b>Desenvolvido por alunos da Fatec Rubens Lara.</b><br/><br/>

        <b>Nome:</b> {appName}
        <br/>
        <b>Descrição:</b> {appDescription}
        <br />
        <b>Versão:</b> {appVersion }
        <br />
        <b>Licença:</b> <a style={styleLink} onClick={() => this.openDialog(licenseTitle, licenseMessage)}> {appLicense} </a>
        <br /><br />

        <b>Integrantes do grupo:</b> <br/>
        <ul>
          <li><b>Bruna</b> - Database Manager</li>
          <li><b>Igor</b> - Frontend Developer</li>
          <li><b>Roger</b> - Frontend Developer</li>
          <li><b>Jean</b> - Backend Developer</li>
          <li><b>Heitor</b> - Designer</li>
        </ul>

        {this.state.dialog}
      </div>
    );
  }
}