/* istanbul ignore file */
 
export interface ObjectCapability {
    name: string;
    _id: string;
}

export interface CapabilityInput {
    name: string;
    _id? : string;
}

export interface IStateCapability {
  data: ObjectCapability[];
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

export interface DataRow {
    _id: string;
    name: string;
    selector? : any
}

