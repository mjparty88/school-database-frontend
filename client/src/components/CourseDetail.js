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
      content = <Redirect to="/notfound"/>
    }
    let editButtons
    if(this.props.context.authenticatedUser) {
      if(this.state.courseOwner.id === this.props.context.authenticatedUser.id){
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
