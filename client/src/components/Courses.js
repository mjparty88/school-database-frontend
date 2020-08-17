import React, {Component} from 'react';
import CourseCard from './CourseCard'
import AddNewCourseCard from './AddNewCourseCard'
import axios from 'axios'


export default class Courses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(response => this.setState({
          courses: response
      }))
    }

  render() {
    return (
      <div className="bounds">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <AddNewCourseCard />
      </div>
    )

  }

}
