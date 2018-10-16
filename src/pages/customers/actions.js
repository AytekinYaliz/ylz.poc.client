/* @flow */
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';

import config from '../../config';
import * as logger from '../../libs/logger';
import { generateOptions } from '../../libs/utilities';
import { connect } from '../../libs/connector';
import { HttpMethod } from '../../libs/constants';
import { GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_ERROR,
   DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_ERROR,
   GET_CUSTOMER_INVOICES_SUCCESS, GET_CUSTOMER_INVOICES_ERROR } from './constants';
import { ActionType, ActionTypeWithData } from '../../types/ActionType';
import { type GetCustomersResponse, type DeleteCustomerResponse,
   type GetCustomerInvoicesResponse } from '../../types/backendResponses';


export type CustomersType = GetCustomersSuccess | GetCustomersError;

export interface GetCustomersSuccess extends ActionTypeWithData<GetCustomersResponse[]> { }
export interface GetCustomersError extends ActionTypeWithData<Error> { }
export interface DeleteCustomerSuccess extends ActionTypeWithData<> { }
export interface DeleteCustomerError extends ActionTypeWithData<Error> { }
export interface GetCustomerInvoicesSuccess extends ActionTypeWithData<{ customerId: string; payload: GetCustomerInvoicesResponse[]; }> { }
export interface GetCustomerInvoicesError extends ActionTypeWithData<Error> { }

function getCustomersSuccess(payload: GetCustomersResponse[]): GetCustomersSuccess {
   return {
      type: GET_CUSTOMERS_SUCCESS,
      payload
   };
}
function getCustomersError(payload: Error): GetCustomersError {
   return {
      type: GET_CUSTOMERS_ERROR,
      payload
   };
}
export function getCustomers(history: History): Function {
   return function(dispatch: Dispatch<GetCustomersResponse[]>) {
      const options = generateOptions(HttpMethod.GET, config.apiBaseurl + config.apiUrl + '/customers');

      connect(options, history)
         .then(response =>
            dispatch( getCustomersSuccess(response.data) )
         )
         .catch(error => {
            logger.error( error );
            dispatch( getCustomersError(error) );
         });

      // return axios(options)
      //    .then((response: AxiosResponse) => {
      //       dispatch( getCustomersSuccess(response.data) );
      //    })
      //    .catch((error: AxiosError) => {
      //       console.log( error.response.status );
      //       dispatch( getCustomersError(error) );
      //    });
   };
}


function deleteCustomerSuccess(payload: DeleteCustomerResponse): DeleteCustomerSuccess {
   return {
      type: DELETE_CUSTOMER_SUCCESS,
      payload
   };
}
function deleteCustomerError(payload: Error): DeleteCustomerError {
   return {
      type: DELETE_CUSTOMER_ERROR,
      payload
   };
}
export function deleteCustomer(customerId: string): Function {
   return function(dispatch: Dispatch<DeleteCustomerResponse>) {
      const options = generateOptions(HttpMethod.DELETE, config.apiBaseurl + config.apiUrl + '/customers/' + customerId);

      return axios(options)
         .then((response: AxiosResponse) => {
            dispatch( deleteCustomerSuccess({ customerId }) );
         })
         .catch((error: AxiosError) => {
            dispatch( deleteCustomerError(error) );
         });
   };
}

function getCustomerInvoicesSuccess(customerId: string, payload: GetCustomerInvoicesResponse[]): GetCustomerInvoicesSuccess {
   return {
      type: GET_CUSTOMER_INVOICES_SUCCESS,
      payload: {
         customerId,
         invoices: payload
      }
   };
}
function getCustomerInvoicesError(payload: Error): GetCustomerInvoicesError {
   return {
      type: GET_CUSTOMER_INVOICES_ERROR,
      payload
   };
}
export function getCustomerInvoices(customerId: string): Function {
   return function(dispatch: Dispatch<GetCustomerInvoicesResponse[]>) {
      const options = generateOptions(HttpMethod.GET, config.apiBaseurl + config.apiUrl + '/customers/' + customerId + '/invoices');

      return axios(options)
         .then((response: AxiosResponse) => {
            dispatch( getCustomerInvoicesSuccess(customerId, response.data) );
         })
         .catch((error: AxiosError) => {
            dispatch( getCustomerInvoicesError(error) );
         });
   };
}
