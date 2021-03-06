import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import Forbidden from './components/Forbidden'
import NotFound from './components/NotFound'
import UnhandledError from './components/UnhandledError'
import UserSignOut from './components/UserSignOut'

//turn all components into subscribers
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const ForbiddenWithContext = withContext(Forbidden);
const NotFoundWithContext = withContext(NotFound);
const UnhandledErrorWithContext = withContext(UnhandledError);
const UserSignOutWithContext = withContext(UserSignOut);



export default function App() {

  return (
    <Router>
      <div>
      <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext}/>
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route exact path="/signup" component={UserSignUpWithContext} />
          <Route exact path="/signin" component={UserSignInWithContext}/>
          <Route exact path="/signout" component={UserSignOutWithContext}/>
          <Route exact path ="/forbidden" component={ForbiddenWithContext}/>
          <Route exact path ="/notfound" component={NotFoundWithContext}/>
          <Route exact path ="/error" component={UnhandledErrorWithContext}/>
          <Route component={NotFoundWithContext}/>
        </Switch>
      </div>
    </Router>
  );
}
