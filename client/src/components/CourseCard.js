import React from 'react';
import {Link} from 'react-router-dom'

export default function CourseCard(props) {

  return (
      <div class='grid-33'>
        <Link class="course--module course--link" to="/">
          <h4 class="course--label">Course</h4>
          <h3 class="course--title">The Course Name</h3>
        </Link>
      </div>
  )

}
