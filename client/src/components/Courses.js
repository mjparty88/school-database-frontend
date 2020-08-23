import React, {Component} from 'react';
import CourseCard from './CourseCard'
import AddNewCourseCard from './AddNewCourseCard'


export default class Courses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: [],
    }
  }

  async componentDidMount() {
    try{
      await this.props.context.data.getCourses().then(response => this.setState({courses: response}))
     } catch(error) {
       this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
     }
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
