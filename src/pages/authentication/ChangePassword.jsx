/* @flow */
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { History } from "history";
import { reduxForm, Field } from "redux-form";
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, HelpBlock } from "react-bootstrap";

import * as authenticationActions from "./actions";
import type { GlobalState } from "../../types/GlobalState";


type Props = {
   history: History;
   submitting: any;
   error: string;
   valid: boolean;
   handleSubmit: Function;
   changePassword: Function;
};
function ChangePassword(props: Props) {
   const handleFormSubmit = (formProps) => {
      props.changePassword(props.history, formProps.password, formProps.newPassword);
   };

   const { handleSubmit, submitting, error } = props;

   return (
      <Form horizontal onSubmit={handleSubmit(handleFormSubmit)}>
         <Field
            name="password"
            type="password"
            component={renderField}
            label="Current password"
         />
         <Field
            name="newPassword"
            type="password"
            component={renderField}
            label="New password"
         />
         <Field
            name="newPasswordConfirm"
            type="password"
            component={renderField}
            label="New password confirm"
         />
         <FormGroup>
            <Col xs={12} smOffset={4} sm={2} mdOffset={5} md={2}>
               <Button
                  type="submit"
                  bsStyle="primary"
                  block
                  disabled={!props.valid && !submitting}
               >
                  Update
               </Button>
            </Col>
            <Col xs={12} smOffset={2} sm={2} mdOffset={0} md={2}>
               <Link to="/" className="right">
                  Cancel
               </Link>
            </Col>
         </FormGroup>
      </Form>
   );
}
function renderField({ input, value, label, type, meta: { touched, error, warning }}) {
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
                  <FormControl.Feedback />
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

   if (!formProps.password) {
      errors.password = "Required!";
   }
   if (!formProps.newPassword) {
      errors.newPassword = "Required!";
   }
   if (!formProps.newPasswordConfirm) {
      errors.newPasswordConfirm = "Required!";
   }
   if (formProps.newPassword !== formProps.newPasswordConfirm) {
      errors.newPassword = "Passwords must match.";
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
      changePassword: (history, password, newPassword) => dispatch( authenticationActions.changePassword(history, password, newPassword) )
   };
}

export default reduxForm({
   form: "ChangePassword",
   validate
})(connect(
   mapStateToProps,
   mapDispatchToProps
)(ChangePassword));
