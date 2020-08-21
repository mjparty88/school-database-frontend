import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route {...rest} render={props => context.authenticatedUser ? (<Component {...props} />) : (<Redirect to={{
                pathname: '/signin', //redirect to the signin pag
                state: { from: props.location}, //you can access from via this.props.location.state.from within the UserSignIn component
              }}
              />)
          }/>
      )}
    </Consumer>
  );
};
