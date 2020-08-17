import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import ErrorPage from './components/ErrorPage'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'



export default function App() {

  const [course, setCourse] = useState([]);

  // The effect happens after render
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then(data => setCourse(data))
    .catch(error => console.log("Error Found", error))
  });


  return (
    <Router>
      <div>
      <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/sign-in" component={UserSignIn}/>
          <Route path="/course-detail" component={CourseDetail} />
          <Route path="/create-course" component={CreateCourse}/>
          <Route path="/update-course" component={UpdateCourse}/>
          <Route path="/error" component={ErrorPage}/>
          <Route path="/forbidden" component={ErrorPage}/>
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    </Router>
  );
}
