/* @flow*/
import React from 'react';
import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export default function(Component: ComponentType<any>) {

   function PrivateRoute(props: any) {
      const token = localStorage.getItem('token');

      return token  //props.isAuthenticated
         ? <Component {...props} />
         : <Redirect to={{
            pathname: `/login`,
            state: { from: props.history.location }  // stored in 'props.history.location.state.from'
            }}
         />;
   };
   function mapStateToProps(state) {
      return {
         isAuthenticated: state.authenticationState.isAuthenticated
      };
   }

   return connect(
      mapStateToProps
   )(PrivateRoute);
}
