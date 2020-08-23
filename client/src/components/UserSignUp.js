import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ValidationErrors from './ValidationErrors'

export default class UserSignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      emailAddress: null,
      password: null,
      confirmPassword: null,
      validationErrors: null
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

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  async handleCreateUser(e) {
    e.preventDefault();
    if(this.state.password === this.state.confirmPassword){
      //password validation matches
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password
      }
    const response = await this.props.context.data.createUser(user)
    if(response){
      //validationErrors were found
      this.setState({
        validationErrors: response,
      })
    } else {
      //success - sign in the user and go to the route
      this.props.context.actions.signIn(this.state.emailAddress, this.state.password)
      this.props.history.goBack();
    }
  } else {
    //password validation failed
    this.setState({
      validationErrors: {errors: ["Password and Confirm Password Must Match"]}
    })
  }

  }


  render() {
    let validationErrors
    if(this.state.validationErrors) {
      validationErrors = <ValidationErrors errors={this.state.validationErrors.errors}/>
    }
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {validationErrors}
          <div>
            <form>
              <div>
                <input id="firstName" name="firstName" type="text" onChange={this.handleFirstNameChange.bind(this)} placeholder="First Name"></input>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" onChange={this.handleLastNameChange.bind(this)} placeholder="First Name"></input>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" onChange={this.handleEmailChange.bind(this)} placeholder="Email Address"></input>
              </div>
              <div>
                <input id="password" name="password" type="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Password"></input>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.handleConfirmPasswordChange.bind(this)} placeholder="Confirm Password"></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={this.handleCreateUser.bind(this)}>Sign Up</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
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
