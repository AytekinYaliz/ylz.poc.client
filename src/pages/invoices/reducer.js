/* @flow */
import { type Nullable } from '../../libs/Nullable';
import {
   GET_INVOICES_SUCCESS, GET_INVOICES_ERROR } from './constants';
import { type InvoicesType,
   GetInvoicesSuccess, GetInvoicesError } from './actions';
import { initialStates } from '../../reducers/initialStates';
import { type InvoicesState, type Invoice } from '../../types/GlobalState';
import { type GetInvoicesResponse } from '../../types/backendResponses';


export function reducer(
   state: Nullable<InvoicesState> = initialStates.invoicesState,
   action: InvoicesType
): Nullable<InvoicesState> {
   console.log( action.type );

   switch(action.type) {
      case GET_INVOICES_SUCCESS: {
         const act: GetInvoicesSuccess = action,
            payload: GetInvoicesResponse[] = act.payload;

         return {
            invoices: payload,
            error: null
         }
      }
      case GET_INVOICES_ERROR: {
         const act: GetInvoicesError = action,
            payload: Error = act.payload;

         return {
            invoices: null,
            error: payload
         };
      }
      // case DELETE_CUSTOMER_SUCCESS: {
      //    const act: DeleteCustomerSuccess = action,
      //       payload: DeleteCustomerResponse = act.payload;

      //    //$FlowFixMe
      //    const index = state.customers.findIndex((customer: Customer) => customer.id === payload.customerId);

      //    if(index > -1) {
      //       //$FlowFixMe
      //       const customers = state.customers.slice();

      //       customers.splice(index, 1);

      //       return {
      //          ...state,
      //          customers
      //       };
      //    }

      //    return state;
      // }
      // case DELETE_CUSTOMER_ERROR: {
      //    const act: DeleteCustomerError = action,
      //       payload: Error = act.payload;

      //    return {
      //       ...state,
      //       error: payload
      //    };
      // }
      // case GET_CUSTOMER_INVOICES_SUCCESS: {
      //    const act: GetCustomerInvoicesSuccess = action,
      //       payload: { customerId: string; invoices: GetCustomerInvoicesResponse[]; } = act.payload;

      //    //$FlowFixMe
      //    const customers = JSON.parse(JSON.stringify(state.customers)); // state.customers.slice();
      //    let customer = customers.find(customer => customer.id === payload.customerId);

      //    if(customer) {
      //       customer.invoices = payload.invoices
      //    }

      //    return {
      //       customers,
      //       error: null
      //    };
      // }
      // case GET_CUSTOMER_INVOICES_ERROR: {
      //    const act: GetCustomerInvoicesError = action,
      //       payload: Error = act.payload;

      //    return {
      //       customers: null,
      //       error: payload
      //    };
      // }
      default:
         return state;
   }
}
