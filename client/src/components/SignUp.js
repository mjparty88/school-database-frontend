import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return(
    <div class="bounds">
      <div class="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form>
            <div>
              <input id="firstName" name="firstName" type="text" class placeholder="First Name"></input>
            </div>
            <div>
              <input id="lastName" name="lastName" type="text" class placeholder="First Name"></input>
            </div>
            <div>
              <input id="emailAddress" name="emailAddress" type="text" class placeholder="Email Address"></input>
            </div>
            <div>
              <input id="password" name="password" type="password" class placeholder="Password"></input>
            </div>
            <div>
              <input id="confirmPassword" name="confirmPassword" type="password" class placeholder="Confirm Password"></input>
            </div>
            <div class="grid-100 pad-bottom">
              <button class="button" type="submit">Sign Up</button>
              <button class="button button-secondary" onclick="event.preventDefault(); location.href='index'">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user acount? <Link to="/">Click here</Link> to sign in!</p>
      </div>
    </div>
  )

}
