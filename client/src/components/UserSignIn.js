import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import ValidationErrors from './ValidationErrors'

export default class UserSignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      emailAddress: '',
      password: '',
      validationErrors: null
    }
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

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

/**
 * handleSignIn(e)
 * Prevent default form submission behaviour
 * Try to signIn the user with the credentials provided
 * If an error is encountered while trying to receive a response, catch it and redirect the user to "/error"
 * If a response is received it will contain validation errors, so load these into state
 * Otherwise, there should be an empty response, in which case this will indicate the Sign In was successful. The user will be redirected to their last location based on the history stack
 * @param {object} e - An event object
 */

  async handleSignIn(e){
    e.preventDefault();
    let response;
    try {
      response = await this.props.context.actions.signIn(this.state.emailAddress,this.state.password);
      if(response.errors){ //if it works and the response contains validation errors, set them into state
          this.setState({
            validationErrors: response,
          })
      } else { //go back
        if(this.props.location.state) { //this location.state.from prop is provided a redirect.
          this.props.history.push(this.props.location.state.from.pathname); //if the user came to sign-up from a redirect, go to their intended location
        } else {
          this.props.history.goBack(); //go back to the last page in the history stack
        }
      }
    } catch(error) {
      this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
    }
  }

  render() {
    let validationErrors;
    if(this.state.validationErrors) {
      validationErrors = <ValidationErrors errors={this.state.validationErrors.errors}/> //conditionally render validation errors
    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
          {validationErrors}
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" onChange={this.handleEmailChange.bind(this)} placeholder="Email Address"/>
              </div>
              <div>
                <input id="password" name="password" type="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Password"/>
              </div>
              <div>
                <button className="button" type="submit" onClick={this.handleSignIn.bind(this)}>Sign In</button>
                <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up</p>
        </div>
      </div>
    )
  }
}
