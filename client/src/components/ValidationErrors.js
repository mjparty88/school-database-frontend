import React, {Fragment} from 'react'

export default function ValidationErrors(props) {
  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {props.errors.map(
            error => { return(
            <Fragment key={error.indexOf()}>
              <li>{error}</li>
            </Fragment>
          )})}
        </ul>
      </div>
    </div>
  )
}
