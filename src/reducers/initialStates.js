/* @flow */
import type { GlobalState } from '../types/GlobalState';


export const initialStates: GlobalState = {
   authenticationState: {
      isAuthenticated: false,
      displayName: '',
      error: ''
   },
   usersState: [],
   customersState: null,
   invoicesState: null
};
