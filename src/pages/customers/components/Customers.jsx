/* @flow */
import * as React from "react";
import { Table, Button, Panel } from "react-bootstrap";
import ReactTable from "react-table";

import "./Customers.scss";
import "react-table/react-table.css";
import type { Nullable } from "../../../libs/Nullable";
import { type Customer } from "../../../types/GlobalState";


type Props = {
   customers: Nullable<Customer[]>;
   handleShowInvoicesClick: Function;
   handleAddClick: Function;
   handleEditClick: Function;
   handleDeleteClick: Function;
};
type State = {
   expanded: Object;
   expandedContent: number;
};
export class CustomersComponent extends React.Component<Props, State> {
   ExpandedContent = {
      notSet: 0,
      Phones: 1,
      Invoices: 2
   };
   state: State = {
      expanded: {},
      expandedContent: this.ExpandedContent.notSet
   }

   handleShowPhonesClick = (customerId: string) => {
      this.setState({ expandedContent: this.ExpandedContent.Phones })
   }
   handleShowInvoicesClick = (customerId: string) => {
      this.props.handleShowInvoicesClick(customerId);
      this.setState({ expandedContent: this.ExpandedContent.Invoices })
   }
   handleEditClick = (customerId: string) => {
      this.props.handleEditClick(customerId);
   }
   handleDeleteClick = (customerId: string) => {
      this.props.handleDeleteClick(customerId);
   }

   renderTable = () => {
      return (
         <ReactTable
            data={this.props.customers ? this.props.customers : []}
            noDataText="No data!"
            filterable
            defaultFilterMethod={
               (filter, row) => String(row[filter.id]).startsWith(filter.value)
            }
            defaultPageSize={10}
            className="-striped -highlight"
            expanded={this.state.expanded}
            onExpandedChange={(newExpanded, index, event) => {
               this.setState({
                  expanded: {
                     [index[0]]: !this.state.expanded[index[0]]
                  },
               });
            }}
            SubComponent={row => (
               <div style={{ backgroundColor: "beige" }}>
                  {this.state.expandedContent === this.ExpandedContent.Phones &&
                     <ReactTable
                        defaultPageSize={row.original.phones && row.original.phones.length}
                        showPagination={false}
                        data={row.original.phones}
                        columns={[
                           {
                              Header: "Phones",
                              accessor: "phone"
                           }
                        ]}
                     />
                  }
                  {this.state.expandedContent === this.ExpandedContent.Invoices &&
                     row.original.invoices &&
                     <ReactTable
                        defaultPageSize={row.original.invoices && row.original.invoices.length}
                        showPagination={false}
                        data={row.original.invoices}
                        columns={[
                           {
                              Header: "#",
                              accessor: "number",
                              maxWidth: 50
                           },
                           {
                              Header: "Amount",
                              accessor: "amount"
                           },
                           {
                              Header: "Donation Date",
                              id: "date",
                              accessor: x => new Date(x.date).toLocaleDateString("en-GB")
                           },
                           {
                              Header: "Branch",
                              accessor: "branch"
                           },
                           {
                              Header: "Staff",
                              accessor: "staffName"
                           },
                           {
                              Header: "Payment Type",
                              accessor: "paymentType"
                           },
                           {
                              Header: "Reason",
                              accessor: "paymentReason"
                           }
                        ]}
                     />
                  }
               </div>
            )}
            columns={[
               {
                  Header: "First Name",
                  accessor: "firstName",
                  filterMethod: (filter, row) => row[filter.id].indexOf(filter.value) > -1
               }, {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
               }, {
                  Header: "Created At",
                  id: "createDate",
                  accessor: x => new Date(x.createDate).toLocaleDateString("en-GB")
               }, {
                  expander: true,
                  width: 65,
                  Expander: ({ isExpanded, index, original }) => (
                     <div
                        className="customCell center"
                        onClick={() => this.handleShowPhonesClick(original.id)}
                     >
                        <i className="fa fa-phone" alt="Show phones" />
                     </div>
                  ),
                  style: {
                     cursor: "pointer",
                     padding: "0",
                     textAlign: "center",
                     userSelect: "none"
                  }
               }, {
                  expander: true,
                  width: 65,
                  Expander: ({ isExpanded, index, original }) => (
                     <div
                        className="customCell center"
                        onClick={() => this.handleShowInvoicesClick(original.id)}
                     >
                        <i className="fa fa-usd" alt="Show receipts" />
                     </div>
                  ),
                  style: {
                     cursor: "pointer",
                     padding: "0",
                     textAlign: "center",
                     userSelect: "none"
                  }
               }, {
                  expander: true,
                  width: 65,
                  Expander: ({ isExpanded, index, original }) => (
                     <div
                        className="customCell center"
                        onClick={() => this.handleEditClick(original.id)}
                     >
                        <i className="fa fa-edit" alt="Edit" />
                     </div>
                  ),
                  style: {
                     cursor: "pointer",
                     padding: "0",
                     textAlign: "center",
                     userSelect: "none"
                  }
               }, {
                  expander: true,
                  width: 65,
                  Expander: ({ isExpanded, index, original }) => (
                     <div
                        className="customCell center"
                        onClick={(e) => {
                           e.preventDefault();
                           // this.handleDeleteClick(original);
                           return false;
                        }}
                     >
                        <i className="fa fa-trash" alt="Edit" />
                     </div>
                  ),
                  style: {
                     cursor: "pointer",
                     padding: "0",
                     textAlign: "center",
                     userSelect: "none"
                  }
               }
            ]}
         />
      );
   }

   render() {
      return (
         <div className="customers">
            <Panel bsStyle="primary">
               <Panel.Heading>
                  <Panel.Title componentClass="h3">
                     Customers
                     <div
                        className="right pointable right"
                        onClick={this.props.handleAddClick}
                     >
                        <i src="" className="fa fa-plus" alt="" />&nbsp; Add new
                     </div>
                  </Panel.Title>
               </Panel.Heading>
               <Panel.Body>
                  {this.renderTable()}
               </Panel.Body>
            </Panel>
         </div>
      );
   }
}


// this.state = {
//    expanded: {}
//}
//
// expanded={this.state.expanded}
// onExpandedChange={(newExpanded, index, event) => this.handleRowExpanded(newExpanded, index, event)}
// handleRowExpanded(rowsState, index) {
//    this.setState({
//      expanded: {
//        [index[0]]: !this.state.expanded[index[0]],
//      },
//    });
//  }
