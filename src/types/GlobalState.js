/* @flow */
import { type Nullable } from '../libs/Nullable';

export type GlobalState = {
   authenticationState: AuthenticationState;
   customersState: Nullable<CustomersState>;
   invoicesState: Nullable<InvoicesState>;
   usersState: any[];
};

export type AuthenticationState = {
   isAuthenticated: boolean;
   displayName: string;
   error: string;
};
export type CustomersState = {
   customers: Nullable<Customer[]>;
   error: Nullable<Error>;
};
export type InvoicesState = {
   invoices: Nullable<Invoice[]>;
   error: Nullable<Error>;
};

export type Customer = {
   id: string;
   firstName: string;
   lastName: string;
   isDeleted: boolean;
   createDate: Date;
   updateDate: Date;
   phones: Nullable<string[]>;
   invoices: Nullable<Invoice[]>;
};

export type Invoice = {
   id: string;
   number: number;
   customerId: string;
   amount: number;
   amountInLetters: string;
   date: Date;
   branch: string;
   staffId: string;
   paymentType: string;
   paymentTypeOther: string;
   paymentReason: string;
   paymentReasonOther: string;
   details: string;

   createDate: Date;
   createdBy: string;
   updateDate: Date;
   updatedBy: string;
};
