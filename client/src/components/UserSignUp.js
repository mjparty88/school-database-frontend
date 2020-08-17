import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserSignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      emailAddress: null,
      password: null,
      confirmPassword: null
    }
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      emailAddress: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
      //To future me. I don't like that the user's password is displayed in the React DevTools. Think of something different. Maybe hash each time?
    })
  }

  handleConfirmPasswordChange(e) {
    this.setState({
      confirmPassword: e.target.value
      //To future me. I don't like that the user's password is displayed in the React DevTools. Think of something different. Maybe hash each time?
    })
  }


  render() {

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div>
                <input id="firstName" name="firstName" type="text" onChange={this.handleFirstNameChange.bind(this)} className placeholder="First Name"></input>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" onChange={this.handleLastNameChange.bind(this)} className placeholder="First Name"></input>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" onChange={this.handleEmailChange.bind(this)} className placeholder="Email Address"></input>
              </div>
              <div>
                <input id="password" name="password" type="password" onChange={this.handlePasswordChange.bind(this)} className placeholder="Password"></input>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.handleConfirmPasswordChange.bind(this)} className placeholder="Confirm Password"></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onclick="event.preventDefault(); location.href='index'">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user acount? <Link to="/">Click here</Link> to sign in!</p>
        </div>
      </div>

    )
  }


}
