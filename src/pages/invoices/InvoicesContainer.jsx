/* @flow */
import * as React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import './InvoicesContainer.scss';
import { type GlobalState, type Invoice } from '../../types/GlobalState';
import type { Nullable } from '../../libs/Nullable';
import * as invoicesActions from './actions';
import { InvoicesComponent } from './components/Invoices.jsx';
import { ModalComponent } from '../../components/modal/Modal.jsx';

type Props = {
   history: History;
   invoices: Nullable<Invoice[]>;
   getInvoices: Function;
};
type State = {
   showModal: boolean;
};
class InvoicesContainer extends React.Component<Props, State> {
   state: State = {
      showModal: false
   };
   componentDidMount() {
      this.props.getInvoices(this.props.history);
   }
   handlePrintClick = (invoiceId) => {
      this.setState({ showModal: true });
   };
   handleAddClick = () => {
      this.setState({ showModal: true });
   };
   handleEditClick = (invoiceId) => {
      this.setState({ showModal: true });
   };
   // handleDeleteClick = (invoiceId) => {
   //    if(confirm('Are you sure you want to delete?')) {
   //       this.props.deleteCustomer(invoiceId);
   //    }
   // };
   handleAddInvoice = () => {
      this.setState({ showModal: true });
   };
   handleHideModal = () => {
      this.setState({ showModal: false });
   };

   render() {
      const { invoices } = this.props;
      return (
         <React.Fragment>
            <InvoicesComponent
               invoices={invoices}
               handlePrintClick={this.handlePrintClick}
               handleAddClick={this.handleAddClick}
               handleEditClick={this.handleEditClick}
            />
            <ModalComponent
               showModal={this.state.showModal}
               bsSize="large"
               dialogClassName="custom-modal"
               onHide={this.handleHideModal}
               content={new ModalContent({ onHide: this.handleHideModal })}
            />
         </React.Fragment>
      );
   }
}
function mapStateToProps(state: GlobalState) {
   return {
      invoices: state.invoicesState && state.invoicesState.invoices
   };
}
function mapDispatchToProps(dispatch: Function) {
   return {
      getInvoices: (history: History) => dispatch( invoicesActions.getInvoices(history) ),
      // getCustomerInvoices: (invoiceId: string) => dispatch( customersActions.getCustomerInvoices(invoiceId) ),
      // deleteCustomer: (invoiceId: string) => dispatch( customersActions.deleteCustomer(invoiceId) )
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(InvoicesContainer);


type Propss = {
   onHide: Function;
};
class ModalContent extends React.Component<Propss> {
   title = 'Hiii';
   body = () => {
      return (
         <div>sdfasdfsdf</div>
      );
   }
   footer = () => {
      return (
         <Button onClick={this.props.onHide}>Close</Button>
      );
   }
}
