import React, {Component} from 'react'
import ValidationErrors from './ValidationErrors'

export default class CreateCourse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      description: null,
      estimatedTime: null,
      materialsNeeded: null,
      errors: null
    }
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleDescChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleEstTimeChange(e) {
    this.setState({
      estimatedTime: e.target.value
    })
  }

  handleMaterialsChange(e) {
    this.setState({
      materialsNeeded: e.target.value
    })
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

/**
 * handleCreate()
 * Prevents default form submission behaviour
 * Creates a course object
 * Tries to create a course. If an error is thrown in the process of receiving a response, this is caught and the user is redirected to '/errors' via the history stack
 * If a response is successfully receive, but the response contains validation errors, these are updated into state
 * Otherwise, the response will be empty (204 - Resource successfully created) and the user is redirected to the '/'
 * @param {object} e - and event object
 */

  async handleCreate(e) {
    e.preventDefault();
    const courseInfo = {
      title: this.state.title,
      description: this.state.description,
      estimatedTIme: this.state.description,
      materialsNeeded: this.state.Description,
      userId: this.props.context.authenticatedUser.id
    }
    try {
      const response = await this.props.context.data.postCourses(courseInfo, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)
      if(response) {
        this.setState({
          errors: response,
        })
      } else {
        this.props.history.push('/')
      }
    } catch(error) {
      this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
    }

  }

  render() {

    let validationErrors;
    if(this.state.errors) {
      validationErrors = <ValidationErrors errors={this.state.errors.errors}/>
    }

    return (
        <div className="bounds course-detail">
          <h1>Create Course</h1>
          <div>
            {validationErrors}
            <form>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.handleTitleChange.bind(this)} placeholder="Course title..."></input>
                  </div>
                  <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea id="description" name="description" onChange={this.handleDescChange.bind(this)} placeholder="Course description..."></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--items">
                      <h4>Estimated Time</h4>
                      <div>
                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.handleEstTimeChange.bind(this)} placeholder="Hours"></input>
                      </div>
                    </li>
                    <li className="course--stats--list--items">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={this.handleMaterialsChange.bind(this)} placeholder="List materials..."></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad=bottom">
                <button className="button" type="submit" onClick={this.handleCreate.bind(this)}>Create Course</button>
                <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    )

  }


}
