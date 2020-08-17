import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export default class UserSignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      emailAddress: null,
      password: null
    }
  }

  handleEmailChange(e) {
    console.log(e.target.value)
    this.setState({
      emailAddress: e.target.value
    })

  }
  handlePasswordChange(e) {
    console.log(e.target.value)
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" onChange={this.handleEmailChange.bind(this)} className placeholder="Email Address"/>
              </div>
              <div>
                <input id="password" name="password" type="password" onChange={this.handlePasswordChange.bind(this)} className placeholder="Password"/>
              </div>
              <div>
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html'">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to='/'>Click here</Link> to sign up</p>
        </div>
      </div>
    )
  }
}
