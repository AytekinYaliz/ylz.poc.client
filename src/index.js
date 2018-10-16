/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';
import configureStore from './store/configureStore';
import { App } from './components/app/App.jsx';
import { LOGIN_SUCCESS } from './pages/authentication/constants';
import RequireAuthentication from './components/routes/RequireAuthentication.jsx';
import Login from './pages/authentication/Login.jsx';
import Logout from './pages/authentication/Logout.jsx';
import Register from './pages/authentication/Register.jsx';
import NotAuthorized from './pages/authentication/NotAuthorized.jsx';


const store = configureStore();
const history = createBrowserHistory();


const token = localStorage.getItem('token');
if (token) {
   store.dispatch({ type: LOGIN_SUCCESS });
}

const appElement = document.querySelector('.app');
if (!(appElement instanceof Element)) {
   throw new Error('invalid type');
}

ReactDOM.render(
   <Provider store={store}>
      <Router history={history}>
         <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/not-authorized" component={NotAuthorized} />
            <Route path="/" component={RequireAuthentication(App)} />
         </Switch>
      </Router>
   </Provider>,
   appElement
);

registerServiceWorker();

declare module 'react' {
   declare class Fragment extends React.Component<any, any> {}
}
