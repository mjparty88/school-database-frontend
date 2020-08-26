import React, {Component} from 'react'
import EditCourseButtons from './EditCourseButtons'
import {Link} from 'react-router-dom'
import CourseInformationForm from './CourseInformationForm'

export default class CourseDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      course: {},
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
    const apiResponse = await this.props.context.data.getCourse(this.props.match.params.id)
    switch(apiResponse) {
      case 404:
        this.props.history.push("/notfound");
        break;
      case 500:
        this.props.history.push("/error");
        break;
      default:
        this.setState({course: apiResponse, courseOwner: apiResponse.user})
    }
  } catch(error) {
    this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
  }
}

  render() {
    let editButtons
    if(this.props.context.authenticatedUser && this.state.course) {
      if(this.state.courseOwner.id === this.props.context.authenticatedUser.id){ //conditionally render EditCourse Buttons (Udpate and Delete) if the user authenticated and they own the course
        editButtons = <EditCourseButtons course={this.state.course} history={this.props.history} context={this.props.context}/> //don't know why I needed to pass the history manually here, perhaps because the EditCourseButtons isn't specifically wrapped in the Router. Manually passing history as a workaround.
      }
    }
    let courseInfo;
    if(this.state.course && this.state.courseOwner) {
      courseInfo = <CourseInformationForm courseData={this.state.course} ownerData={this.state.courseOwner}/>
    }
    return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {editButtons}
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
          </div>
          {courseInfo}
        </div>
    )
  }
}
