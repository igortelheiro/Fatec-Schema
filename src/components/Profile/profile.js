import React from 'react'
import styles from './profile.module.css'

export default class Profile extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userData: {
        avatar: null,
        name: null,
        birthData: null,
        exp: null,
        email: null
      }
    }
  }

  render(){
    return ( 
      <div className={styles.grid-container}>
        <div className="user-presentation">
          <div className="user-avatar">
            Avatar area
          </div>
          <div className="user-essential">
            User Essentials
          </div>
        </div>
        <div className="user-interaction">
          User Interaction
        </div>
        <div className="user-info">
          <div className="column-1"></div>
          <div className="column-2"></div>
        </div>
      </div>
    )
  }
}