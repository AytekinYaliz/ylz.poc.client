/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { withRouter } from "react-router-dom";
import { Router, Route, Switch, IndexRoute } from 'react-router-dom';

import './App.scss';
import Header from '../header/Header.jsx';
import type { GlobalState } from '../../types/GlobalState';

import { Resources } from '../../pages/resources/Resources.jsx';
import CustomersContainer from '../../pages/customers/CustomersContainer.jsx';
import InvoicesContainer from '../../pages/invoices/InvoicesContainer.jsx';
import ChangePassword from '../../pages/authentication/ChangePassword.jsx';


type Props = {
   history: History;
};
export function App(props: Props) {
   return (
      <React.Fragment>
         <Header pathname={props.history.location.pathname} />
         <div className="container">
            <Switch>
               <Route path="/customers" component={CustomersContainer} />
               <Route path="/invoices" component={InvoicesContainer} />
               <Route path="/resources" component={Resources} />
               <Route path="/changePassword" component={ChangePassword} />
            </Switch>
         </div>
      </React.Fragment>
   );
}
