import React from 'react';
import {Link} from 'react-router-dom'

export default function CourseCard(props) {

  return (
      <div className='grid-33'>
        <Link className="course--module course--link" to={props.url}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{props.courseInfo.title}</h3>
        </Link>
      </div>
  )

}
