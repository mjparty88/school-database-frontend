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

  async handleCreate(e) {
    e.preventDefault();
    const courseInfo = {
      title: this.state.title,
      description: this.state.description,
      estimatedTIme: this.state.description,
      materialsNeeded: this.state.Description,
      userId: this.props.context.authenticatedUser.id
    }
    console.log(`Attempting to post couse with creds ----  users: ${this.props.context.authenticatedUser.emailAddress}, password:${this.props.context.authenticatedUser.password}`)
    const response = await this.props.context.data.postCourses(courseInfo, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)
    this.setState({
      errors: response,
    })
  }

  render() {
    return (
        <div className="bounds course-detail">
          <h1>Create Course</h1>
          <div>
            {this.state.errors ? (<ValidationErrors errors={this.state.errors.errors}/>) : (null)}
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
