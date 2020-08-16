import React from 'react';
import CourseCard from './CourseCard'
import AddNewCourseCard from './AddNewCourseCard'


export default function Courses(props) {

  return (
    <div class="bounds">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <AddNewCourseCard />
    </div>
  )
}
