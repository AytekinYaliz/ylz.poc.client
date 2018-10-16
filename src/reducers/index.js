/* @flow */
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { usersReducer } from '../components/users/reducer';
import { reducer as customersReducer } from '../pages/customers/reducer';
import { reducer as invoicesReducer } from '../pages/invoices/reducer';
import { reducer as authenticationReducer } from '../pages/authentication/reducer';


export const rootReducer = combineReducers({
   authenticationState: authenticationReducer,
   usersState: usersReducer,
   customersState: customersReducer,
   invoicesState: invoicesReducer,
   form: reduxFormReducer,
});

export default rootReducer;
