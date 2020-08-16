import React from 'react'
import {Link} from 'react-router-dom'

export default function ActionBar() {

  return (
    <div class="actions--bar">
      <div class="bounds">
        <div class="grid-100">
          <span>
            <Link class="button" to="/"> Update Course </Link>
            <Link class="button" to="/"> Delete Course </Link>
          </span>
          <Link class="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  )

}
