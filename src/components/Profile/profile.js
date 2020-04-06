import React, { useState } from 'react';
import Userdata from '../userdata'

// import EmailIcon from '@material-ui/icons/Email';
import EmailIcon from '@material-ui/icons/AlternateEmail';

export default function Profile(props) {
  const { mainApp } = props

  const icon = {
    paddingBottom: 0,
    margin: 0,

  }

  return (
    <div className="disable-select">
      <div className="card">
        <img className="card" src={Userdata.avatar} alt="user avatar" />
        <div className="container">
          <h4><b> {Userdata.name}, {Userdata.birthdata.idade} </b></h4>
          <p> <EmailIcon color="primary" fontSize="small" style={icon} /> {Userdata.email} </p>
        </div>

      </div>
    </div>
  );
}
