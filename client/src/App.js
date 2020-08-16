import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses'


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
          <Route exact path="/sign-up" />
          <Route exact path="/sign-in" />
          <Route exact path="/course-detail" />
          <Route exact path="/create-course" />
          <Route exact path="/update-course" />
          <Route exact path="/error" />
          <Route exact path="/forbidden" />
          <Route exact path="/notfound" />
        </Switch>
      </div>
    </Router>
  );
}
