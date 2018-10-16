/* @flow */
import { Dispatch } from 'redux';
import { History } from 'history';
import axios, { AxiosResponse, AxiosError } from 'axios';

import config from '../../config';
import {
   LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR,
   CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR, LOGOUT_SUCCESS
} from './constants';
import { ActionType, ActionTypeWithData } from '../../types/ActionType';
import { generateOptions } from '../../libs/utilities';
import { HttpMethod } from '../../libs/constants';
import { LoginResponse, RegisterResponse, ChangePasswordResponse } from '../../types/backendResponses';


export type AuthenticationType = LoginSuccess | LoginError;

export interface LoginSuccess extends ActionTypeWithData<LoginResponse> { }
export interface LoginError extends ActionTypeWithData<string> { }
export interface RegisterSuccess extends ActionTypeWithData<RegisterResponse> { }
export interface RegisterError extends ActionTypeWithData<string> { }
export interface LogoutSuccess extends ActionType { }

function loginSuccess(payload: LoginResponse): LoginSuccess {
   return {
      type: LOGIN_SUCCESS,
      payload
   };
}
function loginError(payload: string): LoginError {
   return {
      type: LOGIN_ERROR,
      payload
   };
}
export function login(history: History, email: string, password: string): Function {
   return function(dispatch: Dispatch<LoginResponse>) {
      const options = {
         method: HttpMethod.POST,
         url: config.apiBaseurl + config.apiUrl + '/login',
         data: { email, password }
      };
      return axios(options)
         .then((response: AxiosResponse) => {
            localStorage.setItem('token', response.data.token);
            dispatch( loginSuccess(response.data) );
            history.push(history.location.state.from ? history.location.state.from : '/');
         })
         .catch((error: AxiosError) => {
            dispatch( loginError(error) );
         });
   };
}

function registerSuccess(payload: RegisterResponse): RegisterSuccess {
   return {
      type: REGISTER_SUCCESS,
      payload
   };
}
function registerError(payload: string): RegisterError {
   return {
      type: REGISTER_ERROR,
      payload
   };
}
export function register(history: History, email: string, password: string, firstName: string, lastName: string): Function {
   return function(dispatch: Dispatch<LoginResponse>) {
      const options = {
         method: HttpMethod.POST,
         url: config.apiBaseurl + config.apiUrl + '/register',
         data: { email, password, firstName, lastName }
      };
      return axios(options)
         .then((response: AxiosResponse) => {
            localStorage.setItem('token', response.data.token);
            dispatch( registerSuccess(response.data) );
            history.push('/resources');
         })
         .catch((error: AxiosError) => {
            dispatch( registerError(error) );
         });
   };
}

function changePasswordSuccess(payload: RegisterResponse): RegisterSuccess {
   return {
      type: CHANGE_PASSWORD_SUCCESS,
      payload
   };
}
function changePasswordError(payload: string): RegisterError {
   return {
      type: CHANGE_PASSWORD_ERROR,
      payload
   };
}
export function changePassword(history: History, password: string, newPassword: string): Function {
   return function(dispatch: Dispatch<ChangePasswordResponse>) {
      const options = {
         ...generateOptions(HttpMethod.POST, config.apiBaseurl + config.apiUrl + '/changePassword'),
         data: { password, newPassword }
      };

      return axios(options)
         .then((response: AxiosResponse) => {
            dispatch( changePasswordSuccess(response.data) );
         })
         .catch((error: AxiosError) => {
            dispatch( changePasswordError(error) );
         });
   };
}

export function logout(): LogoutSuccess {
   localStorage.removeItem('token');
   return { type: LOGOUT_SUCCESS };
}
