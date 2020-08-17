import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class CourseDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div class="actions--bar">
          <div class="bounds">
            <div class="grid-100">
              <span>
                <Link class="button" to="/"> Update Course </Link>
                <Link class="button" to="/"> Delete Course </Link>
              </span>
              <Link class="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div class="bounds course--detail">
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">The Name of the Course</h3>
              <p>By Joe Smith</p>
            </div>
            <div class="course--description">
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <p>Paragraph 3</p>
              <p>Paragraph 4</p>
              <p>Paragraph 5</p>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>14 hours</h3>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
