import axios, { AxiosResponse, AxiosError } from 'axios';
import { History } from 'history';

import { HttpStatusCode } from './constants';
import * as logger from './logger';


export function connect(options, history: History): Promise<any> {
   return new Promise((resolve, reject) => {
      axios(options)
         .then((response: AxiosResponse) => {
            resolve(response);
         })
         .catch((error: AxiosError) => {
            logger.error( error );

            if(error.response && error.response.status === HttpStatusCode.Unauthorized) {
               history.push('/not-authorized');
               return;
            }

            reject(error);
         });
   });
};
