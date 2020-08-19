import React, {Component} from 'react'

export default class UpdateCourse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      description: this.props.description,
      estimatedTime: this.props.estimatedTime,
      materialsNeeded: this.props.materialsNeeded,
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

  render(){
    return(
      <div className="bounds course--details">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.handleTitleChange.bind(this)} placeholder="Course title..." value={this.state.title}></input>
                </div>
                <p>By the Logged in User</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="descirption" className onChange={this.handleDescChange.bind(this)} placeholder="Course description...">{this.state.description}</textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.handleEstTimeChange.bind(this)} placeholder="Hours" value={this.state.estimatedTime}></input>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className onChange={this.handleMaterialsChange.bind(this)} placeholder="Materials needed for the course">{this.state.materialsNeeded}</textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick="event.preventDefault(); location.href='course-detail'">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }


}
