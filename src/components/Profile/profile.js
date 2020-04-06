import React, { useState } from 'react';

export default function Profile(props) {
  const { mainApp, userdata } = props

  return (
    <>
      <div className="card">
        <img className="card" src={userdata.avatar} alt="user avatar" />
        <div className="container">
          <h4><b> {userdata.name}, {userdata.birthdata.idade} </b></h4>
          <p> {userdata.email} </p>
        </div>

      </div>
    </>
  );
}
