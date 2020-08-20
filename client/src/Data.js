export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = "http://localhost:5000/api" + path; //replace path with appropriate baseURLI

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

/* the following contains the main routes for the app and a summary of the HTTP requests they will need to make to the server
  "/" - Courses front end routes (GET to COURSES)
  "/courses/create" - CreateCourse (POST to COURSES)
  "/courses/:id/update" - UpdateCourse (GET to COURSES/:id and PUT to COURSES/:id)
  "/courses/:id" - CourseDetail (GET to COURSES/:id)
  "/signin" - UserSignIn (GET to USERS... I think (this will then store the result in a cookie and store on the browser))
  "/signup" - UserSignUp (POST to USERS)
  "/signout" - UserSignOut (...doesn't require a call to the backend)

Summary of calls required (6)
- GET to COURSES
- POST to COURSES
- GET to COURSES/:id
- PUT to COURSES/:id
- GET to USERS
- POST to USERS
*/

// 1. GET to COURSES
//doesn't require any authentication

async getCourses() {
  const response = await this.api("/courses", "GET", null, null);
  if(response.status === 200) {
    return response.json().then(data => data) //respond with the data
  } else {
    throw new Error();
  }
}

/*
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

*/
}
