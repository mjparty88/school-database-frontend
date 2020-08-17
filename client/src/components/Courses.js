import React, {Component} from 'react';
import CourseCard from './CourseCard'
import AddNewCourseCard from './AddNewCourseCard'


export default class Courses extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div class="bounds">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <AddNewCourseCard />
      </div>
    )

  }

}
