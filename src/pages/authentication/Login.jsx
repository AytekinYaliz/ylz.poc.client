//* @ flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { History } from 'history';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, HelpBlock, Clearfix } from "react-bootstrap";

import { validateEmail } from '../../libs/utilities';
import * as authenticationActions from './actions';
import type { GlobalState } from '../../types/GlobalState';


type Props = {
   history: History;
   submitting: boolean;
   error: string;
   valid: boolean;
   handleSubmit: Function;
   login: Function;
};
function Login(props: Props) {
   const handleFormSubmit = (formProps: any) => {
      props.login(props.history, formProps.email, formProps.password);
   };

   const { handleSubmit, submitting, error } = props;

   return (
      <Form horizontal onSubmit={handleSubmit(handleFormSubmit)}>
         <Field
            name="email"
            type="email"
            label="Email"
            component={renderField}
         />
         <Field
            name="password"
            type="password"
            label="Password"
            component={renderField}
         />
         <FormGroup>
            <Col xs={12} smOffset={4} sm={2} mdOffset={4} md={2}>
               <Button type="submit" bsStyle="primary" block disabled={!props.valid && !submitting}>Login</Button>
            </Col>
            <Col xs={12} smOffset={2} sm={2} mdOffset={0} md={2}>
               <Link to="/register" className="right">Register</Link>
            </Col>
         </FormGroup>
      </Form>
   );
}
function renderField({ input, value, type, label, meta: { touched, error, warning } }) {
   return (
      <FormGroup controlId={label} validationState={getValidationState(touched, error, warning)}>
         <Col componentClass={ControlLabel} xs={12} smOffset={1} sm={3} mdOffset={2} md={2} className="left">
            {label}
         </Col>
         <Col xs={12} sm={6} md={4}>
            <FormControl
               {...input}
               value={value}
               type={type}
               placeholder={label}
            />
            {touched && error &&
               <React.Fragment>
                  <FormControl.Feedback />
                  <HelpBlock>{error}</HelpBlock>
               </React.Fragment>
            }
         </Col>
      </FormGroup>
   );
}
function getValidationState(touched, error, warning) {
   if(!touched) {
      return null;
   } else if(error) {
      return 'error';
   } else if(warning) {
      return 'warning';
   }
   return null;
}
function validate(formProps) {
   const errors = {};

   if (!formProps.email) {
      errors.email = "Required!";
   }
   if (!formProps.password) {
      errors.password = "Required!";
   }
   if(formProps.email && !validateEmail(formProps.email)) {
      errors.email = "Not a valid email!";
   }

   return errors;
}

function mapStateToProps(state) {
   return {
      error: state.authenticationState.error
   };
}
function mapDispatchToProps(dispatch: Function) {
   return {
      login: (history, email, password) => dispatch( authenticationActions.login(history, email, password) )
   };
}

export default reduxForm({
   form: "Login",
   validate
})(connect(
   mapStateToProps,
   mapDispatchToProps
)(Login));
