import React from 'react';
import {Link} from 'react-router-dom'

export default function Header() {

  return (

      <div class="header">
        <div class ="bounds">
          <h1 class="header--logo">Courses</h1>
          <nav>
            <Link class="signup" to="/">Sign Up</Link>
            <Link class="signin" to="/">Sign In</Link>
          </nav>
        </div>
      </div>
  )
}
