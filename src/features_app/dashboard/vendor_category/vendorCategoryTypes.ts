/* istanbul ignore file */
 
export interface ObjectVendorCategory {
    name: string;
    id: string;
}

export interface VendorCategoryInput {
    name: string;
    id? : string;
}

export interface IStateVendorCategory {
  data: ObjectVendorCategory[];
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
    id: string;
    name: string;
    selector? : any
}

