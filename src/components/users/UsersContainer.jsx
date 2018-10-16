/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { UsersListComponent } from './UsersList.jsx';
import type { GlobalState } from '../../types/GlobalState';
import { getUsers } from './actions';


type Props = {
   users: any[];
   getUsers: () => void;
};
class UsersContainer extends React.Component<Props> {
   componentDidMount() {
      this.props.getUsers();
   }

   render() {
      return (
         <UsersListComponent users={this.props.users} />
      );
   }
}
function mapStateToProps(state: GlobalState) {
   return {
      users: state.usersState
   };
}
function mapDispatchToProps(dispatch) {
   return {
      getUsers: () => dispatch( getUsers() )
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(UsersContainer);
