import React from 'react'
import {Link} from 'react-router-dom'

export default function Forbidden(props) {
  return (
    <div className="bounds">
      <h1>403 - Forbidden</h1>
      <p>You are not permitted to make changes to content that isn't yours</p>
      <Link className="button button-secondary" to="/">Return to the List</Link>
    </div>
  )
}
