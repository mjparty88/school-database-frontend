import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function CourseInformationForm(props) {

  return (
    <div className="bounds course--detail">
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{props.courseData.title}</h3>
          <p>by {props.ownerData.firstName} {props.ownerData.lastName}</p>
        </div>
        <div className="course--description">
          <ReactMarkdown source={props.courseData.description} />
        </div>
      </div>
      <div className="grid-25 grid-right">
      <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <h3>{props.courseData.estimatedTime}</h3>
              </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ul>
                <ReactMarkdown source={props.courseData.materialsNeeded} />
              </ul>
            </li>
          </ul>
          </div>
      </div>
    </div>
  )
}
