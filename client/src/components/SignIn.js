import React from 'react'
import {
  Link
} from 'react-router-dom';

export default function SignIn() {
  return (
    <div class="bounds">
      <div class="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form>
            <div>
              <input id="emailAddress" name="emailAddress" type="text" class placeholder="Email Address"/>
            </div>
            <div>
              <input id="password" name="password" type="password" class placeholder="Password"/>
            </div>
            <div>
              <button class="button" type="submit">Sign In</button>
              <button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html'">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <Link to='/'>Click here</Link> to sign up</p>
      </div>
    </div>
  )
}
