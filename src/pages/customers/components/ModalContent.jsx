/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock, Clearfix } from "react-bootstrap";

import "./ModalContent.scss";
import type { Nullable } from '../../../libs/Nullable';
import { validateEmail } from '../../../libs/utilities';
import { type Customer } from '../../../types/GlobalState';


type Props = {
   initialValues: Nullable<Customer>;
   submitting: boolean;
   error: string;
   onHide: Function;
   handleSubmit: Function;
};
function ModalContent(props: Props) {
   const handleFormSubmit = (formProps: any) => {
      // props.login(props.history, formProps.email, formProps.password);
   };

   const { handleSubmit, submitting, error } = props;

   return (
      <Form className="modalForm" horizontal onSubmit={handleSubmit(handleFormSubmit)}>
         <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderField}
         />
         <Field
            name="lastName"
            type="text"
            label="Last Name"
            component={renderField}
         />
         <Field
            name="address1"
            type="text"
            label="Address 1"
            component={renderField}
         />
         <Field
            name="address2"
            type="text"
            label="Address 2"
            component={renderField}
         />
         <Field
            name="town"
            type="text"
            label="Town"
            component={renderField}
         />
         <Field
            name="city"
            type="text"
            label="City"
            component={renderField}
         />
         <Field
            name="postCode"
            type="text"
            label="Post Code"
            component={renderField}
         />
         <Field
            name="email"
            type="email"
            label="Email"
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
   )
}
function renderField({ input, type, label, meta: { touched, error, warning } }: any) {
   return (
      <FormGroup controlId={label} validationState={getValidationState(touched, error, warning)}>
         <Col componentClass={ControlLabel} xs={12} smOffset={1} sm={3} mdOffset={2} md={2} className="left">
            {label}
         </Col>
         <Col xs={12} sm={6} md={4}>
            <FormControl
               {...input}
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

export default reduxForm({
   form: "Customer",
   validate
})(connect(
   null,
   null
)(ModalContent));
