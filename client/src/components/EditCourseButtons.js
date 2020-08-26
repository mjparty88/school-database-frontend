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
      console.log(props)
      const apiResponse = await props.context.data.deleteCourse(props.course, props.context.authenticatedUser.emailAddress, props.context.authenticatedUser.password);
      console.log(apiResponse)
      switch(apiResponse) {
        case null: //successfully deleted course
          console.log("I'm here")
          props.history.push("/");
          break;
        case 404: //400 response from the API
          props.history.push("/notfound");
          break;
        default: //500 response from the API
          props.history.push("/error");
        }
    } catch(error) {
      console.log("im throwing and error here")
      props.history.push("/error") //if the data request doesn't work at all, go to the error page
    }
  }

  return (
    <span>
      <Link className="button" to={`/courses/${props.course.id}/update`}> Update Course </Link>
      <span className="button" onClick={handleDelete}> Delete Course </span>
    </span>
  )

}
