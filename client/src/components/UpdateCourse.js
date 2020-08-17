import React from 'react'

export default function UpdateCourse() {

  return(
    <div class="bounds course--details">
      <h1>Update Course</h1>
      <div>
        <form>
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <div>
                <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..." value="Build a bitching bookcase"></input>
              </div>
              <p>By the Logged in User</p>
            </div>
            <div class="course--description">
              <div>
                <textarea id="description" name="descirption" class placeholder="Course description..."> All of the flavor text of the bitching bookcase goes here.</textarea>
              </div>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder="Hours" value="14 hours"></input>
                  </div>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" class placeholder="List materials">All of the materials for the bitching bookcase go here</textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-100 pad-bottom">
            <button class="button" type="submit">Update Course</button>
            <button class="button button-secondary" onclick="event.preventDefault(); location.href='course-detail'">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )

}
