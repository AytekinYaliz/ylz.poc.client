/* @flow */
import { type Nullable } from '../../libs/Nullable';
import {
   GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_ERROR,
   DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_ERROR,
   GET_CUSTOMER_INVOICES_SUCCESS, GET_CUSTOMER_INVOICES_ERROR } from './constants';
import { type CustomersType,
   GetCustomersSuccess, GetCustomersError,
   DeleteCustomerSuccess, DeleteCustomerError,
   GetCustomerInvoicesSuccess, GetCustomerInvoicesError } from './actions';
import { initialStates } from '../../reducers/initialStates';
import { type CustomersState, type Customer } from '../../types/GlobalState';
import { type GetCustomersResponse, type DeleteCustomerResponse,
   type GetCustomerInvoicesResponse } from '../../types/backendResponses';


export function reducer(
   state: Nullable<CustomersState> = initialStates.customersState,
   action: CustomersType
): Nullable<CustomersState> {
   switch(action.type) {
      case GET_CUSTOMERS_SUCCESS: {
         const act: GetCustomersSuccess = action,
            payload: GetCustomersResponse[] = act.payload;

         return {
            customers: payload,
            error: null
         }
      }
      case GET_CUSTOMERS_ERROR: {
         const act: GetCustomersError = action,
            payload: Error = act.payload;

         return {
            customers: null,
            error: payload
         };
      }
      case DELETE_CUSTOMER_SUCCESS: {
         const act: DeleteCustomerSuccess = action,
            payload: DeleteCustomerResponse = act.payload;

         //$FlowFixMe
         const index = state.customers.findIndex((customer: Customer) => customer.id === payload.customerId);

         if(index > -1) {
            //$FlowFixMe
            const customers = state.customers.slice();

            customers.splice(index, 1);

            return {
               ...state,
               customers
            };
         }

         return state;
      }
      case DELETE_CUSTOMER_ERROR: {
         const act: DeleteCustomerError = action,
            payload: Error = act.payload;

         return {
            ...state,
            error: payload
         };
      }
      case GET_CUSTOMER_INVOICES_SUCCESS: {
         const act: GetCustomerInvoicesSuccess = action,
            payload: { customerId: string; invoices: GetCustomerInvoicesResponse[]; } = act.payload;

         //$FlowFixMe
         const customers = JSON.parse(JSON.stringify(state.customers)); // state.customers.slice();
         let customer = customers.find(customer => customer.id === payload.customerId);

         if(customer) {
            customer.invoices = payload.invoices
         }

         return {
            customers,
            error: null
         };
      }
      case GET_CUSTOMER_INVOICES_ERROR: {
         const act: GetCustomerInvoicesError = action,
            payload: Error = act.payload;

         return {
            customers: null,
            error: payload
         };
      }
      default:
         return state;
   }
}
