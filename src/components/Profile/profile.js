import React, { useState } from 'react';
import Userdata from '../userdata'

// import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

export default function Profile(props) {
  const { mainApp } = props

  return (
    <div className="disable-select">
      <div className="card">
        <img className="avatar_card" src={Userdata.avatar} alt="user avatar" />
        <div className="container">

          <h4 className="card_field">
            <PersonIcon className="card_icon" color="primary" fontSize="small" />
            <b> {Userdata.name}, {Userdata.birthdata.idade} </b>
          </h4>

          <br />

          <span className="card_field">
            <EmailIcon className="card_icon" color="primary" fontSize="small" />
            <p className="txt_card"> {Userdata.email} </p>
          </span>
        </div>

      </div>
    </div>
  );
}
