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
    try {
      const apiResponse = await this.props.context.data.getCourses()
      switch(apiResponse) {
        case 500: //500 returned by the API
          this.props.history.push("/error");
          break;
        default:
          this.setState({courses: apiResponse});
      }
     } catch(error) {
       this.props.history.push("/error") //if the data request doesn't work at all, go to the error page
     }
  }

  render() {
    let courses = null;
    if(this.state.courses[0]) {
      courses = this.state.courses.map(course => <CourseCard key={course.id} courseInfo={course} url={`/courses/${course.id}`}/>)
    }
    return (
      <div className="bounds">
        {courses}
          <AddNewCourseCard />
      </div>
    )

  }

}
