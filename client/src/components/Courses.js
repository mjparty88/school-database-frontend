import React, {Component} from 'react';
import CourseCard from './CourseCard'
import AddNewCourseCard from './AddNewCourseCard'
import axios from 'axios'
import Data from '../Data'


export default class Courses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      dataObj: new Data()
    }
  }

  async componentDidMount() {
    await this.state.dataObj.getCourses().then(response => this.setState({courses: response}))


   /*await axios.get('http://localhost:5000/api/courses')
      .then(response => this.setState({
          courses: response.data
      }))
      */
    }

  render() {
    return (
      <div className="bounds">
          {this.state.courses.map(
            course => <CourseCard
              key={course.id}
              courseInfo={course}
              url={`/courses/${course.id}`}/>
            )}
          <AddNewCourseCard />
      </div>
    )

  }

}
