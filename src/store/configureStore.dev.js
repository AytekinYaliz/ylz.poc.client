/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import type { GlobalState } from '../types/GlobalState';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import asyncMiddleware from '../middlewares/async';

export default function configureStore(initialState: GlobalState) {
   // redux-devtools
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

   return createStore(
      rootReducer,
      initialState,
      composeEnhancers (
         applyMiddleware(
            // asyncMiddleware,// we don't use w/ reduxThunk
            reduxThunk,
            reduxImmutableStateInvariant(),
            routerMiddleware(createHistory())
         )
      )
   );
}
