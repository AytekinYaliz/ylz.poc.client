
export type LoginResponse = {
   user: string;
   token: string;
};

export type RegisterResponse = {
   user: string;
   token: string;
};

export type ChangePasswordResponse = { };

export type GetCustomersResponse = {
   id: string;
   firstName: string;
   lastName: string;
   createDate: Date;
};

export type DeleteCustomerResponse = {
   customerId: string;
};

export type GetCustomerInvoicesResponse = {
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


export type GetInvoicesResponse = {
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
