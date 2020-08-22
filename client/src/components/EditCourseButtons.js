import React from 'react'
import {Link} from 'react-router-dom'

export default function EditCourseButtons(props) {
  return (
    <span>
      <Link className="button" to={`/courses/${props.id}/update`}> Update Course </Link>
      <Link className="button" to="/"> Delete Course </Link>
    </span>
  )
}
