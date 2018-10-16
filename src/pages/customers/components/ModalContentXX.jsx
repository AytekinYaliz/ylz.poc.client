/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { reduxForm, Field  } from 'redux-form';
import { Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock, Clearfix } from "react-bootstrap";

import "./ModalContent.scss";

type Propss = {
   onHide: Function;
};
export class ModalContent extends React.Component<Propss> {
   title = 'Hiii';
   customer: any;
   constructor(props: Propss, customer: any) {
      super(props);
      this.customer = customer;
   }
   handleFormSubmit = () => {
      //props.login(props.history, formProps.email, formProps.password);
   };
   body = () => {
      const onChange = e => { this.customer[e.target.name] = e.target.value }
      return (
         <Form horizontal className="modalForm" onSubmit={this.handleFormSubmit}>
            {this.renderField({ input: {name: 'firstName', onChange}, value: this.customer.firstName, type: 'text', label: 'First Name', meta: {touched: false, error: '', warning: ''} })}
            {this.renderField({ input: {name: 'lastName', onChange}, value: this.customer.lastName, type: 'text', label: 'Last Name', meta: {touched: false, error: '', warning: ''} })}
         </Form>
      );
   };
   footer = () => {
      return (
         <React.Fragment>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={this.handleFormSubmit}>Save</Button>
         </React.Fragment>
      );
   };
   renderField = ({ input, value, type, label, meta: { touched, error, warning } }: any) => {
      return (
         <FormGroup controlId={label} validationState={this.getValidationState(touched, error, warning)}>
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
   getValidationState = (touched: any, error: any, warning: any) => {
      if(!touched) {
         return null;
      } else if(error) {
         return 'error';
      } else if(warning) {
         return 'warning';
      }
      return null;
   }
}
// function validate(formProps) {
//    const errors = {};

//    if (!formProps.email) {
//       errors.email = "Required!";
//    }
//    if (!formProps.password) {
//       errors.password = "Required!";
//    }
//    if(formProps.email && !validateEmail(formProps.email)) {
//       errors.email = "Not a valid email!";
//    }

//    return errors;
// }

// export default reduxForm({
//    form: "Login",
//    validate
// })(connect(
//    null,
//    null
// )(ModalContent));
