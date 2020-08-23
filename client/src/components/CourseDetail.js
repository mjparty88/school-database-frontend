import React, {Component} from 'react'
import EditCourseButtons from './EditCourseButtons'
import {Link, Redirect} from 'react-router-dom'
import CourseInformationForm from './CourseInformationForm'

export default class CourseDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      course: {},
      error: null,
      courseOwner: {},
    }
  }

/**
 * componentDidMount()
 * React Lifecycle Method
 * Will attempt to get course CourseInformation
 * If an error is thrown while trying to obtain the data it will redirect to "/error" via the history stack
 * If the response received 404, update state to reflect that the course wasn't Found
 * Otherwise update the course object in state to reflect the response
 */

  async componentDidMount() {
  try {
    const response = await this.props.context.data.getCourse(this.props.match.params.id)
    if(response === 404) {
      this.setState({
        error: {
          errName : "404 - Not Found",
          errDesc: "There is not course with this id"
        }
      })
    } else {
      this.setState({
        course: response,
        courseOwner: response.user
      })
    }
  } catch(error) {
    this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
  }
}

  render() {
    let content;
    if(this.state.error) {
      content = <Redirect to="/notfound"/> //conditionally render a redirect to "/notfound" the state includes error
    }
    let editButtons
    if(this.props.context.authenticatedUser) {
      if(this.state.courseOwner.id === this.props.context.authenticatedUser.id){ //conditionally render EditCourse Buttons (Udpate and Delete) if the user authenticated and they own the course 
        editButtons = <EditCourseButtons course={this.state.course} context={this.props.context}/>
      }
    }
    return (
        <div>
        {content}
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {editButtons}
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
          </div>
          <CourseInformationForm courseData={this.state.course} ownerData={this.state.courseOwner}/>
        </div>
    )
  }
}
