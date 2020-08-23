import React from 'react'
import {Link} from 'react-router-dom'

export default function EditCourseButtons(props) {

  async function handleDelete(e) {
    e.preventDefault()
    await props.context.data.deleteCourse(props.course, props.context.authenticatedUser.emailAddress, props.context.authenticatedUser.password);
    props.history.push('/')
  }

  return (
    <span>
      <Link className="button" to={`/courses/${props.course.id}/update`}> Update Course </Link>
      <span className="button" onClick={handleDelete}> Delete Course </span>
    </span>
  )

}
