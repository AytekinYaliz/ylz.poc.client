/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { History } from 'history';

import './Header.scss';
import {
   type GlobalState,
   type AuthenticationState
} from '../../types/GlobalState';
import { If } from '../../libs/utilities';

type Props = {
   authenticationState: AuthenticationState,
   toggleAuthentication: Function
};
function Header(props: Props) {
   const renderLinks = () => {
      const renderAuthenticated = () => {
         return (
            <Navbar.Collapse>
               <Nav>
                  <LinkContainer to="/customers">
                     <NavItem>Customers</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/invoices">
                     <NavItem>Receipts</NavItem>
                  </LinkContainer>
               </Nav>
               <Nav pullRight>
                  <NavDropdown eventKey={3} title="Profile" id="header-profiles">
                     <LinkContainer to="/changePassword">
                        <NavItem>Change password</NavItem>
                     </LinkContainer>
                  </NavDropdown>
                  <NavItem href="/logout">Log out</NavItem>
               </Nav>
            </Navbar.Collapse>
         );
      };
      const renderNonAuthenticated = () => {
         return (
            <Navbar.Collapse>
               <Nav pullRight>
                  <NavItem href="/login">Login</NavItem>
                  <NavItem href="/register">Register</NavItem>
               </Nav>
            </Navbar.Collapse>
         );
      };
      return (
         <If
            condition={props.authenticationState.isAuthenticated}
            positive={renderAuthenticated()}
            negative={renderNonAuthenticated()}
         />
      );
   };

   return (
      <Navbar inverse collapseOnSelect>
         <Navbar.Header>
            <Navbar.Brand>
               <Link to="/" className="navbar-brand">
                  <img
                     src="/resources/images/brand.png"
                     className="brand"
                     alt=""
                  />
               </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
         </Navbar.Header>
         {renderLinks()}
      </Navbar>
   );
}
function mapStateToProps(state: GlobalState) {
   return {
      authenticationState: state.authenticationState
   };
}

export default connect(mapStateToProps, null)(Header);
