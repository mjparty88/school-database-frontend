import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './Context';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import ErrorPage from './components/ErrorPage'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'

//turn all components into subscribers
const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const ErrorPageWithContext = withContext(ErrorPage);


export default function App() {

  return (
    <Router>
      <div>
      <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/courses/create" component={CreateCourseWithContext}/>
          <Route path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext}/>
          <Route component={ErrorPageWithContext}/>
        </Switch>
      </div>
    </Router>
  );
}
