import React from 'react'
import {Link} from 'react-router-dom'

export default function EditCourseButtons(props) {

/**
 * handleDelete()
 * Attempts to delete the course and redirect to '/'. If an error is thrown during this deletion "/error" is called
 * @param {object} e - An event object
 */

  async function handleDelete(e) {
    e.preventDefault()
    try {
      await props.context.data.deleteCourse(props.course, props.context.authenticatedUser.emailAddress, props.context.authenticatedUser.password);
      props.history.push('/')
    } catch(error) {
      this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
    }
  }

  return (
    <span>
      <Link className="button" to={`/courses/${props.course.id}/update`}> Update Course </Link>
      <span className="button" onClick={handleDelete}> Delete Course </span>
    </span>
  )

}
