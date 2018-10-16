import { AnyAction } from "redux";


export interface ActionType extends AnyAction {
   type: string;
}
export interface ActionTypeWithData<T> extends AnyAction {
   type: string;
   payload: T;
}
