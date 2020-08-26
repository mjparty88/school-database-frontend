import React, {Component} from 'react'
import ValidationErrors from './ValidationErrors'

export default class UpdateCourse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      title: '',
      description: '',
      estimatedTime: null,
      materialsNeeded: null,
      courseOwner: {},
      validationErrors: null
    }
  }

/**
 * componentDidMount()
 * React Lifecycle Method
 * Tries to get the course information from the database. If an error is encountered trying to receive the response, this is caught and the user is redirected to "/error" via the history stack
 * If the response is successfully received, but the response is 404, this this is updated into state
 * Otherwise the response is loaded into state
 * Once the course information is loaded into state, the userId of the course is compared against the authenticated user Id. If they do not match, an error is laoded into state.
*/

  async componentDidMount() {
    try{
      const apiResponse = await this.props.context.data.getCourse(this.props.match.params.id)

      switch(apiResponse){
        case 500: //500 explicitly returned by the API
          this.props.history.push("/error");
          break;
        case 404: //404 not found
          this.props.history.push('/notfound')
          break;
        default: //successful retrieval of the course
          this.setState({
            id: apiResponse.id,
            title: apiResponse.title,
            description: apiResponse.description,
            estimatedTime: apiResponse.estimatedTime,
            materialsNeeded: apiResponse.materialsNeeded,
            courseOwner: apiResponse.user
          })
        }

        if(this.state.courseOwner.id !== this.props.context.authenticatedUser.id) {
          this.props.history.push("/forbidden") //sends the user to /forbidden if they not the authenticated user
        }

    } catch(error) {
      this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
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
    this.props.history.goBack();
  }

/**
 * handleUpdate(e)
 * Prevent default form submission behaviour
 * Try to create a course object and update it into the database
 * If an error is encountered while trying to receive a response, catch it and redirect the user to "/error"
 * If a response is received it will contain validation errors, so load these into state
 * Otherwise, there should be an empty response, in which case this will indicate the update was successful. The user will be redirected to "/courses/:id" via the match params
 * @param {object} e - An event object
 */

  async handleUpdate(e) {
    e.preventDefault();
    try{
      const courseDetails = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded,
        userId: this.state.courseOwner.id
      }
      let apiResponse = await this.props.context.data.updateCourse(courseDetails, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)


      switch(apiResponse) {
          case null: //204 success
            this.props.history.push(`/courses/${this.props.match.params.id}`)
            break;
          case 500: //500 explicity thrown by the API
            this.props.history.push("/errors")
            break;
          default: //default behaviour is to return validation errors
            this.setState({validationErrors: apiResponse})
      }

    } catch(error) {
      this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
    }
  }


  render() {

    let validationErrors;
    if(this.state.validationErrors) {
      validationErrors = <ValidationErrors errors={this.state.validationErrors.errors}/> //conditionally render Validation Errors if they are in state
    }

    return (

      <div className="bounds course--details">
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
                {this.state.courseOwner? (<p>By {this.state.courseOwner.firstName} {this.state.courseOwner.lastName}</p>) : null }
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
