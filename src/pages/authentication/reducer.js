/* @flow */
import {
   LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS
} from './constants';
import type { AuthenticationType } from './actions';
import { initialStates } from '../../reducers/initialStates';
import { type AuthenticationState } from '../../types/GlobalState';


export function reducer(
   state: AuthenticationState = initialStates.authenticationState,
   action: AuthenticationType
): AuthenticationState {
   switch(action.type) {
      case LOGIN_SUCCESS: {
         return { ...state, isAuthenticated: true, error: '' };
      }
      case LOGIN_ERROR: {
         return { ...state, isAuthenticated: false, error: action.payload.message };
      }
      case REGISTER_SUCCESS: {
         return { ...state, isAuthenticated: true, error: '' };
      }
      case REGISTER_ERROR: {
         return { ...state, isAuthenticated: false, error: action.payload.message };
      }
      case LOGOUT_SUCCESS: {
         return { ...state, isAuthenticated: false };
      }
      default:
         return state;
   }
}
