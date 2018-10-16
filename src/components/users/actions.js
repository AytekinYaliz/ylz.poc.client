/* @flow */
import axios from 'axios';

import { GET_USERS } from './constants';


export type UsersType = GetUsersType;

export type GetUsersType = {
   type: string;
   payload: any;
};
export function getUsers() {
   return {
      type: GET_USERS,
      payload: axios.get('https://jsonplaceholder.typicode.com/users')
   };
}
