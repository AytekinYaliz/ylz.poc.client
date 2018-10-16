import { HttpMethod } from "./constants";

export function generateOptions(method = HttpMethod.GET, url, isAuthenticationRequired = true) {
   const options = {
      method,
      url
   };
   if (isAuthenticationRequired) {
      options.headers = { 'Authorization': localStorage.getItem('token') };
   }
   return options;
}
/**
 * const pos = () => <span>Hi there</span>;
 * const neg = <span>No there</span>;
 * <If condition={true} then={pos} else={neg} />
 */
export function If({ condition = false, positive = null, negative = null }) {
   return condition
      ? typeof positive === "function" ? positive() : positive
      : typeof negative === "function" ? negative() : negative;
}

// if(!Array.prototype.forEachAsync) {
//    Array.prototype.forEachAsync =  async function(callback: Function) {
//       for (let item of this) {
//          await callback(item);
//       }
//    }
// }


export function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}
