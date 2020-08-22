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

  handleSignIn(e){
    e.preventDefault();
    this.props.context.actions.signIn(this.state.emailAddress,this.state.password);
    this.props.history.goBack();
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
