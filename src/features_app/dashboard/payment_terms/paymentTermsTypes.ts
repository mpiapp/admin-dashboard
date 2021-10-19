/* istanbul ignore file */

export interface ObjectPaymentTerms {
    name: string;
    id: string;
}

export interface PaymentTermsInput {
    name: string;
    id? : string;
}

export interface IStatePaymentTerms {
  data: ObjectPaymentTerms[];
  loading: boolean;
  error? : any,
  loading_create: boolean,
  error_create ?: any,
  create : boolean,
  loading_update : boolean,
  error_update?: any,
  update : boolean,
  loading_remove : boolean,
  error_remove?: any,
  remove : boolean
}

export interface DataRowPaymentTerms {
    id: string;
    name: string;
    selector? : any
}

