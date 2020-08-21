import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'

export default function Header(props) {

  return (

      <div className="header">
        <div className ="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
          { props.context.authenticatedUser ? (
            <Fragment>
              <span>Welcome {props.context.authenticatedUser.firstName} {props.context.authenticatedUser.lastName}</span>
              <Link className="signout" to="/signin" onClick={props.context.actions.signOut}>Sign Out</Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </Fragment>
          )
          }
          </nav>
        </div>
      </div>
  )
}
