/* istanbul ignore file */

export interface ObjectStatus {
    name: string;
    id: string;
}

export interface StatusInput {
    name: string;
    id? : string;
}

export interface IStateStatus {
  data: ObjectStatus[];
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

