export default class Data {

/**
 * api()
 * constructs a JavaScript fetch call fetch(url,options) and implements basic authentication
 * @param {string} path - The path being added to the Base URL of the REST endpoint
 * @param {string} method - The HTTP method of the fetch call (default to GET)
 * @param {object} body - The content of the HTTP body to be sent
 * @param {boolean} requiresAuth - Whether the REST endpoint requires basic authentication
 * @param {object} credentials - An object containing the username and password to be included in the Authorization Header of the HTTP request
 */

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

    return fetch(url, options)
  }

/**
 * getCourses()
 * GET to COURSES (used in the "/" route of the front end)
 */

  async getCourses() {
    const response = await this.api("/courses", "GET", null, null);
    if(response.status === 200) {
      return response.json().then(data => data) //respond with the data
    } else {
      throw new Error("UnhandledError")
    }
  }

/**
 * postCourses()
 * POST to COURSES (used in the "/courses/create" route of the front end)
 * @param {object} course - The course being posted to the database.
 * @param {string} emailAddress - The email address of the authenticated user
 * @param {string} password - The password of the authenticated user
 */

  async postCourses(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {username: emailAddress, password: password})
    if(response.status === 201) {
      return null;
    } else {
      return response.json().then(data => data) //returned payload with the errors provided by the  API
    }
  }

/**
 * getCourse()
 * GET to COURSES/:id (used in the "/courses/:id" route of the front end)
 * @param {integer} id - The id of the course being fetched
 */

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null, null);
    if(response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 404) {
      return response.status
    } else {
      throw new Error("UnhandledError")
    }
  }

/**
 * updateCourse()
 * PUT to COURSES/:id (used in the "/courses/:id/update" route of the front end)
 * @param {object} course - The course information updated to the database.
 * @param {string} emailAddress - The email address of the authenticated user
 * @param {string} password - The password of the authenticated user
 */

  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {username: emailAddress, password: password})
    if(response.status === 204) {
      return null;
    } else {
      return response.json().then(data => data) //.json().then(data => data) //returned payload with the errors provided by the  API
    }
  }

/**
 * deleteCourse()
 * DELETE to COURSES/:id (used in the "/courses/:id" route of the front end)
 * @param {object} course - The course being posted to the database.
 * @param {string} emailAddress - The email address of the authenticated user
 * @param {string} password - The password of the authenticated user
 */

  async deleteCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, {username: emailAddress, password: password})
    if(response.status === 204) {
      return [];
    } else {
      throw new Error("UnhandledError")
    }
  }

/**
* getUser()
* GET to Users (used in the "/signin" route of the front end)
* @param {string} emailAddress - The email address of the authenticated user
* @param {string} password - The password of the authenticated user
*/

  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {username: emailAddress, password: password});
    if(response.status === 200 || response.status === 401 || response.status === 403) {
      return response.json().then(data => data)
    } else {
      throw new Error("UnhandledError")
    }
  }

/**
* createUser()
* POST to Users (used in the "/signup" route of the front end)
* @param {object} user - An object containing user information
*/

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if(response.status === 201){
      return null;
    } else {
      return response.json().then(data => data)
    }
  }

}
