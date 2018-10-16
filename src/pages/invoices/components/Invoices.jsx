/* @flow */
import * as React from "react";
import { Table, Button, Panel } from "react-bootstrap";
import ReactTable from "react-table";

import "./Invoices.scss";
import "react-table/react-table.css";
import type { Nullable } from "../../../libs/Nullable";
import { type Invoice } from "../../../types/GlobalState";


type Props = {
   invoices: Nullable<Invoice[]>;
   handlePrintClick: Function;
   handleAddClick: Function;
   handleEditClick: Function;
};
type State = {
   expanded: Object;
   expandedContent: number;
};
export class InvoicesComponent extends React.Component<Props, State> {
   ExpandedContent = {
      notSet: 0,
      Phones: 1,
      Invoices: 2
   };
   state: State = {
      expanded: {},
      expandedContent: this.ExpandedContent.notSet
   }

   handlePrintClick(invoiceId: string) {
      this.props.handlePrintClick(invoiceId);
      // this.setState({ expandedContent: this.ExpandedContent.Phones });
   };
   handleEditClick(invoiceId: string) {
      this.props.handleEditClick(invoiceId);
   };

   render() {
      return (
         <div className="customers">
            <Panel bsStyle="primary">
               <Panel.Heading>
                  <Panel.Title componentClass="h3">
                     Invoices
                     <div
                        className="right pointable right"
                        onClick={this.props.handleAddClick}
                     >
                        <i src="" className="fa fa-plus" alt="" />&nbsp; Add new
                     </div>
                  </Panel.Title>
               </Panel.Heading>
               <Panel.Body>
                  <ReactTable
                     data={this.props.invoices ? this.props.invoices : []}
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
                     columns={[
                        {
                           Header: "No",
                           width: 60,
                           accessor: "number",
                           filterMethod: (filter, row) => row[filter.id] === filter.value
                        }, {
                           Header: "Customer",
                           width: 150,
                           accessor: "customerName",
                           filterMethod: (filter, row) => row[filter.id].indexOf(filter.value) > -1
                        }, {
                           Header: "Amount",
                           width: 80,
                           accessor: "amount"
                        }, {
                           Header: "Donation Date",
                           id: "date",
                           accessor: x => new Date(x.date).toLocaleDateString("en-GB")
                        }, {
                           Header: "Branch",
                           accessor: "branch"
                        }, {
                           Header: "Staff",
                           accessor: "staffName"
                        }, {
                           Header: "Payment Type",
                           accessor: "paymentType"
                        }, {
                           Header: "Payment Reason",
                           accessor: "paymentReason"
                        }, {
                           Header: "Entry Date",
                           id: "createDate",
                           accessor: x => new Date(x.createDate).toLocaleDateString("en-GB")
                        }


                        , {
                           expander: true,
                           width: 65,
                           Expander: ({ isExpanded, index, original }) => (
                              <div
                                 className="customCell center"
                                 onClick={() => this.handleEditClick(original)}
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
