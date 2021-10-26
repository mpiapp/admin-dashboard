/* istanbul ignore file */
 
export interface ObjectUserSuperadmin {
    name: string;
    email: string;
    password: string;
    role: string,
    flag : string,
    status: string,
    verified: boolean,
    id: string;
}

export interface UserSuperadminInput {
    name: string;
    password: string;
    email: string;
    role?: string,
    flag? : string,
    status?: string,
    verified?: boolean,
    id?: string;
}

export interface IStateUserSuperadmin {
  data: ObjectUserSuperadmin[];
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

export interface DataRowUserSuperadmin {
    id: string;
    name: string;
    password: string;
    email: string;
    role: string,
    flag : string,
    status: string,
    verified: boolean,
    selector? : any
}

