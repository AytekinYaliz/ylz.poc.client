/* @flow */
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';

import config from '../../config';
import logger from '../../libs/logger';
import { generateOptions } from '../../libs/utilities';
import { connect } from '../../libs/connector';
import { HttpMethod } from '../../libs/constants';
import { GET_INVOICES_SUCCESS, GET_INVOICES_ERROR } from './constants';
import { ActionType, ActionTypeWithData } from '../../types/ActionType';
import { type GetInvoicesResponse } from '../../types/backendResponses';


export type InvoicesType = GetInvoicesSuccess | GetInvoicesError;

export interface GetInvoicesSuccess extends ActionTypeWithData<GetInvoicesResponse[]> { }
export interface GetInvoicesError extends ActionTypeWithData<Error> { }
// export interface DeleteCustomerSuccess extends ActionTypeWithData<> { }
// export interface DeleteCustomerError extends ActionTypeWithData<Error> { }
// export interface GetCustomerInvoicesSuccess extends ActionTypeWithData<{ customerId: string; payload: GetCustomerInvoicesResponse[]; }> { }
// export interface GetCustomerInvoicesError extends ActionTypeWithData<Error> { }

function getInvoicesSuccess(payload: GetInvoicesResponse[]): GetInvoicesSuccess {
   return {
      type: GET_INVOICES_SUCCESS,
      payload
   };
}
function getInvoicesError(payload: Error): GetInvoicesError {
   return {
      type: GET_INVOICES_ERROR,
      payload
   };
}
export function getInvoices(history: History): Function {
   return function(dispatch: Dispatch<GetInvoicesResponse[]>) {
      const options = generateOptions(HttpMethod.GET, config.apiBaseurl + config.apiUrl + '/invoices');

      connect(options, history)
         .then(response =>
            dispatch( getInvoicesSuccess(response.data) )
         )
         .catch(error => {
            logger.error( error );
            dispatch( getInvoicesError(error) );
         });
   };
}


// function deleteCustomerSuccess(payload: DeleteCustomerResponse): DeleteCustomerSuccess {
//    return {
//       type: DELETE_CUSTOMER_SUCCESS,
//       payload
//    };
// }
// function deleteCustomerError(payload: Error): DeleteCustomerError {
//    return {
//       type: DELETE_CUSTOMER_ERROR,
//       payload
//    };
// }
// export function deleteCustomer(customerId: string): Function {
//    return function(dispatch: Dispatch<DeleteCustomerResponse>) {
//       const options = generateOptions(HttpMethod.DELETE, config.apiBaseurl + config.apiUrl + '/customers/' + customerId);

//       return axios(options)
//          .then((response: AxiosResponse) => {
//             dispatch( deleteCustomerSuccess({ customerId }) );
//          })
//          .catch((error: AxiosError) => {
//             dispatch( deleteCustomerError(error) );
//          });
//    };
// }

// function getCustomerInvoicesSuccess(customerId: string, payload: GetCustomerInvoicesResponse[]): GetCustomerInvoicesSuccess {
//    return {
//       type: GET_CUSTOMER_INVOICES_SUCCESS,
//       payload: {
//          customerId,
//          invoices: payload
//       }
//    };
// }
// function getCustomerInvoicesError(payload: Error): GetCustomerInvoicesError {
//    return {
//       type: GET_CUSTOMER_INVOICES_ERROR,
//       payload
//    };
// }
// export function getCustomerInvoices(customerId: string): Function {
//    return function(dispatch: Dispatch<GetCustomerInvoicesResponse[]>) {
//       const options = generateOptions(HttpMethod.GET, config.apiBaseurl + config.apiUrl + '/customers/' + customerId + '/invoices');

//       return axios(options)
//          .then((response: AxiosResponse) => {
//             dispatch( getCustomerInvoicesSuccess(customerId, response.data) );
//          })
//          .catch((error: AxiosError) => {
//             dispatch( getCustomerInvoicesError(error) );
//          });
//    };
// }
