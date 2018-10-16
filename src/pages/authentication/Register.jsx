/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { History } from 'history';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

import './Register.scss';
import { validateEmail } from '../../libs/utilities';
import * as authenticationActions from './actions';
import type { GlobalState } from '../../types/GlobalState';


type Props = {
   history: History;
   submitting: boolean;
   error: string;
   valid: boolean;
   handleSubmit: Function;
   register: Function;
};
function Register(props: Props) {
   const handleFormSubmit = (formProps) => {
      props.register(props.history, formProps.email, formProps.password, formProps.firstName, formProps.lastName);
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
         <Field
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            component={renderField}
         />
         <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderField}
         />
         <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
         />
         <FormGroup>
            <Col xs={12} smOffset={4} sm={2} mdOffset={5} md={2}>
               <Button
                  type="submit"
                  bsStyle="primary"
                  block
                  disabled={!props.valid && !submitting}
               >
                  Register
               </Button>
            </Col>
            <Col xs={12} smOffset={2} sm={2} mdOffset={0} md={2}>
               <Link to="/login" className="right">
                  Login
               </Link>
            </Col>
         </FormGroup>
      </Form>
   );
}
function renderField({ input, value, type, label, meta: { touched, error, warning }}) {
   return (
      <FormGroup controlId={label} validationState={getValidationState(touched, error, warning)}>
         <Col componentClass={ControlLabel} xs={12} sm={3} smOffset={1} md={2} mdOffset={3} className="left">
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
                  <FormControl.Feedback />,
                  <HelpBlock>{error}</HelpBlock>
               </React.Fragment>
            }
         </Col>
      </FormGroup>
   );
}
function getValidationState(touched, error, warning) {
   if (!touched) {
      return null;
   } else if (error) {
      return "error";
   } else if (warning) {
      return "warning";
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
   if (!formProps.passwordConfirm) {
      errors.passwordConfirm = "Required!";
   }
   if (!formProps.firstName) {
      errors.firstName = "Required!";
   }
   if (!formProps.lastName) {
      errors.lastName = "Required!";
   }
   if (formProps.password !== formProps.passwordConfirm) {
      errors.password = "Passwords must match.";
   }
   if (!validateEmail(formProps.email)) {
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
      register: (history, email, password, firstName, lastName) =>
         dispatch(
            authenticationActions.register(
               history,
               email,
               password,
               firstName,
               lastName
            )
         )
   };
}

export default reduxForm({
   form: "Register",
   validate
})(connect(
   mapStateToProps,
   mapDispatchToProps
)(Register));
