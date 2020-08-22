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

/*
Summary of calls required (7)
- GET to COURSES
- POST to COURSES
- GET to COURSES/:id
- PUT to COURSES/:id
- DELETE to COURSES/:id
- GET to USERS
- POST to USERS
*/

// 1. GET to COURSES (works on the index route)
//doesn't require any authentication

async getCourses() {
  const response = await this.api("/courses", "GET", null, null);
  if(response.status === 200) {
    return response.json().then(data => data) //respond with the data
  } else {
    throw new Error();
  }
}

//2. POST to Courses
async postCourses(course, emailAddress, password) {
  const response = await this.api("/courses", "POST", course, true, {username: emailAddress, password: password})
  if(response.status === 201) {
    return null;
  } else {
    return response.json().then(data => data) //returned payload with the errors provided by the  API
  }
}

//3. GET to Courses/:id
//doesn't require authentication

async getCourse(id) {
  const response = await this.api(`/courses/${id}`, "GET", null, null);
  if(response.status === 200) {
    return response.json().then(data => data)
  } else if (response.status === 404) {
    return response.status
  } else {
    throw new Error();
  }
}

//4. PUT to Courses/:id

async updateCourse(course, emailAddress, password) {
  const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {username: emailAddress, password: password})
  if(response.status === 204) {
    return null;
  } else {
    return response.json().then(data => data) //.json().then(data => data) //returned payload with the errors provided by the  API
  }
}

//5. DELETE to Courses/:id

async deleteCourse(course, emailAddress, password) {
  const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, {username: emailAddress, password: password})
  console.log(response)
  if(response.status === 204) {
    return [];
  } else {
    throw new Error();
  }
}

//6. GET to User

async getUser(emailAddress, password) {
  const response = await this.api("/users", "GET", null, true, {username: emailAddress, password: password});
  if(response.status === 200) {
    return response.json().then(data => data)
  } else {
    throw new Error();
  }
}

//7. POST to User

async createUser(user) {
  const response = await this.api("/users", "POST", user);
  if(response.status === 201){
    return [];
  } else {
    throw new Error();
  }
}

}
