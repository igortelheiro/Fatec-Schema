import React from 'react';
const { shell } = require('electron')

export default function AppAbout(props) {
  const appName = require('../../package.json').name
  const appDescription = require('../../package.json').description
  const appVersion = require('../../package.json').version
  const appLicense = require('../../package.json').license

  function showDepends(){
    let depends = JSON.stringify(appDepends)
    depends = depends.substr(1, depends.length-2)
    return depends.replace(/\,/g, "\n")
  }

  function openLink(link){
    shell.openExternal(link)
  }

  return (
    <div>
      <h2>Conheça-nos</h2>
      <b>Desenvolvido por Fatec Rubens Lara.</b><br/><br/>

      <b>Nome:</b> {appName} - {appDescription}<br/>
      <b>Versão:</b> {appVersion}<br />
      <b>Licença:</b> {appLicense}<br /><br />

      <b>Integrantes do grupo:</b><br/>
      <ul>
        <li><b>Bruna</b> - Database Manager</li>
        <li><b>Igor</b> - Frontend Developer</li>
        <li><b>Roger</b> - Frontend Developer</li>
        <li><b>Jean</b> - Backend Developer</li>
        <li><b>Heitor</b> - Designer</li>
      </ul>
    </div>
  );
}