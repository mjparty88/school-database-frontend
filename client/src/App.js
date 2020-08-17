import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Error from './components/Error'
import SignIn from './components/SignIn'
import CreateCourse from './components/CreateCourse'



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
          <Route path="/sign-up" />
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/course-detail" component={CourseDetails} />
          <Route path="/create-course" component={CreateCourse}/>
          <Route path="/update-course" />
          <Route path="/error" component={Error}/>
          <Route path="/forbidden" component={Error}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}
