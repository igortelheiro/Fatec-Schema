import React, { useState } from 'react';
import Userdata from '../userdata'

// import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/AlternateEmail';

export default function Profile(props) {
  const { mainApp } = props

  return (
    <div className="disable-select">
      <div className="card">
        <img className="avatar_card" src={Userdata.avatar} alt="user avatar" />
        <div className="container">

          <h4 className="txt_card">
            <PersonIcon className="icon" color="primary" fontSize="small" />
            <b> {Userdata.name}, {Userdata.birthdata.idade} </b>
          </h4>

          <span className="txt_card">
            <p><EmailIcon className="icon" color="primary" fontSize="small" />
            {Userdata.email} </p>
          </span>
        </div>

      </div>
    </div>
  );
}
