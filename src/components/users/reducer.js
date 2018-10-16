/* @flow */
import { GET_USERS } from './constants';
import type { UsersType, GetUsersType } from './actions';


export const usersReducer = (state: any[] = [], action: UsersType) => {
   switch (action.type) {
      case GET_USERS: {
         return action.payload.data;
      }
   }

   return state;
};
