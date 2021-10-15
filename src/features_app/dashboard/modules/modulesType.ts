/* istanbul ignore file */

export interface DataRow {
    id: string;
    name: string;
    link: string;
    flag : string;
    feature_ids : any[];
    selector? : any
}; 

export interface ObjectModules {
    name: string;
    id: string;
    link: string;
    flag: string;
    feature_ids: any[];
}

export interface ModulesInput {
    name: string;
    link: string;
    flag?: string;
    feature_ids?: any[];
    id? : string;
}

export interface IStateModules {
  data: ObjectModules[];
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