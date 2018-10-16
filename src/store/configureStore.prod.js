/* @flow */
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import type { GlobalState } from '../types/GlobalState';
import rootReducer from '../reducers';
import asyncMiddleware from '../middlewares/async';


export default function configureStore(initialState: GlobalState) {
   return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
         // asyncMiddleware,
         reduxThunk,
         routerMiddleware(createHistory())
      )
   );
}
