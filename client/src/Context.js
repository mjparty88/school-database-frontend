import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

/**
 * signIn()
 * Implements getUser() from Data.js to retrieve a user from the database.
 * The endpoint has authentication validation built in, so it will only respond with a user object, if username and password matches
 * The returned user object is persisted into state as the authenticated user, and set as a cookie in the browser
 * @param {string} username - The username provided by the user (is an email)
 * @param {string} password - The password provided by the user
 */

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user.errors) { //if there are errors
      return user; //return the errors
    } else { //add the user into state and persist the authenticatedUser in context
      user[0].password = password //add the user password into state as its not returned by the API
      this.setState(() => {
        return {
          authenticatedUser: user[0],
        };
      });
      //sets a cookie on the browser with an expiration of 1 day to persist the user session.
      Cookies.set('authenticatedUser', JSON.stringify(user[0]), {expires: 1});
      return user;
    }
  }

/**
 * signIn()
 * Drops the whatever authenticated user is persistent in state.
 * Removes the authenticatedUser cookie from the browser
 */

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
