import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound(props) {
  return (
    <div className="bounds">
      <h1>404 - Not Found</h1>
      <p>The page or resource you're looking for doesn't exist</p>
      <Link className="button button-secondary" to="/">Return to the List</Link>
    </div>
  )
}
