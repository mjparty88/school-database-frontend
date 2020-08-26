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

/**
 * handleCreateUser(e)
 * Prevent default form submission behaviour
 * Declare a user variable
 * If the password and confirmPassword fields matched, create the user object with the form data -- otherwise create a validation error
 * If the user object was create, try to pass it into the createUser() function
 * If an error is encountered while trying to receive a response, catch it and redirect the user to "/error"
 * If a response is received it will contain validation errors, so load these into state
 * Otherwise, there should be an empty response, in which case this will indicate the createUser() request was successful. If so, sign the user in.
 * The user will be redirected to their last location based on the history stack
 * @param {object} e - An event object
 */

  async handleCreateUser(e) {
      e.preventDefault();
      let user = null;
      if(this.state.password === this.state.confirmPassword){
        //password validation matches create a user variable
        user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          emailAddress: this.state.emailAddress,
          password: this.state.password
        }
      } else { //password validation failed
        this.setState({
          validationErrors: {errors: ["Password and Confirm Password Must Match"]}
        })
      }
    if(user) { //if the initial validation passes, try and create a user
      try {
        const apiResponse = await this.props.context.data.createUser(user)
        switch(apiResponse){
          case null: //201 successful creation
            this.props.context.actions.signIn(this.state.emailAddress, this.state.password) //signed the user in
            this.props.history.goBack(); //goBack
            break;
          case 500: //500 returned by the API
            this.props.history.push("/error")
            break;
          default: //validation errors
            this.setState({ validationErrors: apiResponse })
        }
      } catch(error) {
        this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
      }
    }
  }


  render() {
    let validationErrors
    if(this.state.validationErrors) {
      validationErrors = <ValidationErrors errors={this.state.validationErrors.errors}/> //conditionally render validation errors
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
                <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
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
