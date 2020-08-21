import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class CourseDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      course: {},
      courseOwner: {},
    //  dataObj: new Data()
    }
  }

  async componentDidMount() {
  //  await this.state.dataObj.getCourse(this.props.match.params.id).then(response => this.setState({
  //    course: response,
  //    courseOwner: response.user
  //  }))
  }

  render() {
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to="/"> Update Course </Link>
                <Link className="button" to="/"> Delete Course </Link>
              </span>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>by {this.state.courseOwner.firstName} {this.state.courseOwner.lastName}</p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{this.state.course.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
