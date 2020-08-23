import React from 'react'
import {Link} from 'react-router-dom'

export default function UnhandledError(props) {
  return (
    <div className="bounds">
      <h1>500 - Server Error</h1>
      <p>Something went wrong with the serer.</p>
      <Link className="button button-secondary" to="/">Return to the List</Link>
    </div>
  )
}
