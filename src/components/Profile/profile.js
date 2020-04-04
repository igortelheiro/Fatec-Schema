import React from 'react'
import Divider from '@material-ui/core/Divider';

export default class Profile extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userData: {
        avatar: null,
        name: null,
        birthData: null,
        exp: null,
		email: null,
		auth: this.props.mainApp.state.logged
      }
    }
  }

  render(){
    return (
		<div className="container">
			<div className="card-area">
				Div 1
				<div className="card">
					<div className="card-title">
						<h3> UserName </h3>
					</div>

					<Divider />

					<div className="card-avatar">
						<img src="http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/03/Avatar.jpg" alt="user avatar" />
					</div>

					<Divider />

					<div className="card-info">
						User Info
					</div>
				</div>
			</div>
			<div className="user-interaction"> Div 2 </div>
			<div className="user-info"> Div 3 </div>
		</div>
    )
  }
}
