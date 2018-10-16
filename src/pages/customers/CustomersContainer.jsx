/* @flow */
import * as React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';

import './CustomersContainer.scss';
import { type GlobalState, type Customer } from '../../types/GlobalState';
import type { Nullable } from '../../libs/Nullable';
import * as customersActions from './actions';
import { CustomersComponent } from './components/Customers.jsx';
import { ModalComponent } from '../../components/modal/Modal.jsx';
import ModalContent from './components/ModalContent.jsx';

type Props = {
   history: History;
   customers: Nullable<Customer[]>;
   getCustomers: Function;
   getCustomerInvoices: Function;
   deleteCustomer: Function;
};
type State = {
   showModal: boolean;
   customer: Nullable<Customer>;
};
class CustomersContainer extends React.Component<Props, State> {
   state: State = {
      showModal: false,
      customer: null
   };
   componentDidMount() {
      this.props.getCustomers(this.props.history);
   }
   handleShowInvoicesClick = (customerId) => {
      this.props.getCustomerInvoices(customerId);
   };
   handleAddClick = () => {
      this.setState({ showModal: true, customer: null });
   };
   handleEditClick = (customerId) => {
      const customer = this.props.customers && this.props.customers.find(c => c.id === customerId);
      this.setState({ showModal: true, customer });
   };
   handleDeleteClick = (customerId) => {
      if(confirm('Are you sure you want to delete?')) {
         this.props.deleteCustomer(customerId);
      }
   };
   handleHideModal = () => {
      this.setState({ showModal: false });
   };

   render() {
      const { customers } = this.props;
      return (
         <React.Fragment>
            <CustomersComponent
               customers={customers}
               handleShowInvoicesClick={this.handleShowInvoicesClick}
               handleAddClick={this.handleAddClick}
               handleEditClick={this.handleEditClick}
               handleDeleteClick={this.handleDeleteClick}
            />
            <ModalComponent
               showModal={this.state.showModal}
               bsSize="large"
               dialogClassName="custom-modal"
               onHide={this.handleHideModal}
               title={this.state.customer ? "Edit customer" : "Add customer"}
               body={<ModalContent initialValues={this.state.customer} onHide={this.handleHideModal} />}
            />
         </React.Fragment>
      );
   }
}
function mapStateToProps(state: GlobalState) {
   return {
      customers: state.customersState && state.customersState.customers
   };
}
function mapDispatchToProps(dispatch: Function) {
   return {
      getCustomers: (history: History) => dispatch( customersActions.getCustomers(history) ),
      getCustomerInvoices: (customerId: string) => dispatch( customersActions.getCustomerInvoices(customerId) ),
      deleteCustomer: (customerId: string) => dispatch( customersActions.deleteCustomer(customerId) )
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CustomersContainer);
