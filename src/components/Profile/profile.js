import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

export default class Profile extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userData: {
        avatar: 'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/03/Avatar.jpg',
        name: null,
        birthData: null,
        exp: null,
		    email: null,
		    auth: this.props.mainApp.state.logged
      }
    }
  }

  render(){
    const userData = this.state.userData

    return (
            <div className="card">
              <img src={userData.avatar} alt="user avatar" />
              <div className="container">
                <h4><b>User Name</b></h4>
                <p>Architect & Engineer</p>
              </div>

            </div>
    )
  }
}
