/* istanbul ignore file */

export interface DataRow  {
  id: string;
  name: string;
  flag: string;
  selector? : any;
  module_ids?: any[]
}

export interface RolesInput {
  name: string;
  id? : string;
  flag?: string;
  module_ids?: any[];
}

export interface ObjectInput {
  name: string;
  id : string;
  flag: string;
  module_ids?: any[]
}

export interface IStateRoles {
  data: ObjectInput[];
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