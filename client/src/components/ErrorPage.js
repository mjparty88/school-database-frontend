import React from 'react'

export default function ErrorPage(props) {
  return (
    <div className="bounds">
      <h1>{props.errors.errName}</h1>
      <p>{props.errors.errDesc}</p>
    </div>
  )
}
