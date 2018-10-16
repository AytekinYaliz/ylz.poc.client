/* @flow */
import { Dispatch } from 'redux';

// export default function({ dispatch }) {
//    return function( next ) {
//       return function( action ) {
//          next(action);
//       }
//    }
// }


export default ({dispatch}: {dispatch: Dispatch}) => {
   return (next: Function) => (action: any) => {
      /**
       * If action does not have a payload or
       * the payload does not have a .then() property
       * we don't care about it. Send it on, please.
       */
      if(!action.payload || !action.payload.then) {
         return next(action);
      }

      /**
       * We have a promise
       * Make sure the action's promise resolves.
       * Dispatch the action again.
       */
      action.payload
         .then(response => {
            const newAction = {
               ...action,
               payload: response.data
            };
            dispatch( newAction );
         }).catch(error => {
            console.log( error.response.status );
         });
   }
}

// ACTION_CREATOR
// export function getCustomers() {
//    const options = generateOptions(HttpMethod.GET, config.apiBaseurl + config.apiUrl + '/customers');
//
//    return {
//       type: GET_CUSTOMERS_SUCCESS,
//       payload: connect(options)
//    };
// }

// CONNECTOR
// export function connect(options): Promise<any> {
//    return new Promise((resolve, reject) => {
//       axios(options)
//          .then((response: AxiosResponse) => {
//             resolve(response);
//          })
//          .catch((error: AxiosError) => {
//             reject(error);
//          });
//    });
// };

// ASYNC
// export default ({dispatch}: {dispatch: Dispatch}) => {
//    return (next: Function) => (action: any) => {
//       /**
//        * If action does not have a payload or
//        * the payload does not have a .then() property
//        * we don't care about it. Send it on, please.
//        */
//       if(!action.payload || !action.payload.then) {
//          return next(action);
//       }
//
//       /**
//        * We have a promise
//        * Make sure the action's promise resolves.
//        * Dispatch the action again.
//        */
//       action.payload
//          .then(response => {
//             const newAction = {
//                ...action,
//                payload: response.data
//             };
//             dispatch( newAction );
//          }).catch(error => {
//             console.log( error.response.status );
//          });
//    }
// }
