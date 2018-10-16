/* @flow */
import React from 'react';

import './UsersList.scss';


type Props = {
   users: any[];
};
export function UsersListComponent(props: Props) {
   return (
      <div className="usersList">
         {props.users.map(renderUser)}
      </div>
   );
}

function renderUser(user: any) {
   return (
      <div key={user.id} className="card">
         <div className="card-header">{user.name}</div>
         <div className="card-body">{user.company.name}</div>
         <div className="card-footer">
            <a className="btn btn-primary">{user.email}</a>
         </div>
      </div>
   );
}
