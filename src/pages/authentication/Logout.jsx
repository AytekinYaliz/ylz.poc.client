/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { History } from 'history';
// import { reduxForm } from 'redux-form';
import * as authenticationActions from './actions';
import type { GlobalState } from '../../types/GlobalState';


type Props = {
   history: History;
   errorMessage: string;
   logout: Function;
};
function Logout(props: Props) {
   props.logout();

   return (
      <div>
         See you again..
      </div>
   );
}
function mapDispatchToProps(dispatch: Function) {
   return {
      logout: () => dispatch( authenticationActions.logout() )
   };
}

export default connect(
   null, mapDispatchToProps
)(Logout);
