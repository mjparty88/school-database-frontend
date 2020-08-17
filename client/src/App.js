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

  return (
    <Router>
      <div>
      <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse}/>
          <Route path="/courses/:id/update" component={UpdateCourse}/>
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signin" component={UserSignIn}/>
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    </Router>
  );
}
