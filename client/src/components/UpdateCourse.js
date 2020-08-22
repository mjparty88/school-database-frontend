import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ValidationErrors from './ValidationErrors'

export default class UpdateCourse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      courseOwner: {},
      error: null,
      validationErrors: null
    }
  }

  async componentDidMount() {
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
        id: response.id,
        title: response.title,
        description: response.description,
        estimatedTime: response.estimatedTime,
        materialsNeeded: response.materialsNeeded,
        courseOwner: response.user
      })
    }
    if(this.state.courseOwner.id !== this.props.context.authenticatedUser.id) {
      this.setState({
        error: {
          errName : "403 - Forbidden",
          errDesc: "This course doesn't belong to you, you cannot edit it"
      }})
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

  async handleUpdate(e) {
    e.preventDefault();
    const courseDetails = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
      userId: this.state.courseOwner.id
    }
    let response = await this.props.context.data.updateCourse(courseDetails, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)
    console.log(response)
    if(response) {
      this.setState({
        validationErrors: response,
      })
    } else {
      this.props.history.push(`/courses/${this.props.match.params.id}`)
    }
  }


  render() {
    let content;
    if(this.state.error) {
      content = <Redirect to="/forbidden"/>
    }
    let validationErrors;
    if(this.state.validationErrors) {
      validationErrors = <ValidationErrors errors={this.state.validationErrors.errors}/>
    }

    return (

      <div className="bounds course--details">
      {content}
        <h1>Update Course</h1>
        <div>
          {validationErrors}
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.handleTitleChange.bind(this)} placeholder="Course title..." value={this.state.title}></input>
                </div>
                <p>By {this.state.courseOwner.firstName} {this.state.courseOwner.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="descirption" onChange={this.handleDescChange.bind(this)} placeholder="Course description..." value={this.state.description}></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.handleEstTimeChange.bind(this)} placeholder="Hours" value={this.state.estimatedTime  || ''}></input>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" onChange={this.handleMaterialsChange.bind(this)} placeholder="Materials needed for the course" value={this.state.materialsNeeded  || ''}></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit" onClick={this.handleUpdate.bind(this)}>Update Course</button>
              <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }


}
