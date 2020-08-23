import React from 'react'
import ErrorItem from './ErrorItem'

export default function ValidationErrors(props) {
  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {props.errors.map (
            error => <ErrorItem key={error} error={error} />
          )}
        </ul>
      </div>
    </div>
  )
}
