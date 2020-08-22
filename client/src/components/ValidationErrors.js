import React, {Fragment} from 'react'

export default function ValidationErrors(props) {
  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {props.errors.map(
            error => { return(
            <Fragment>
              <li>{error.title}</li> //Please provide a value for "Title"
              <li>{error.message}</li> //Please provide a value for "Description"
            </Fragment>
          )})}
        </ul>
      </div>
    </div>
  )
}
