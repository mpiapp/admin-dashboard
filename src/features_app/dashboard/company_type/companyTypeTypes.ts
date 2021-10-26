/* istanbul ignore file */

export interface DataRowCompanyType {
    name: string;
    id: string;
    legal_doc?: any;
    selector? : any
}

export interface CompanyTypeInput { 
    name: string;
    id? : string;
    legal_doc?: any;
}

export interface ObjectCompanyType {
    name: string;
    id: string;
    legal_doc?: any;
}

export interface IStateCompanyType {
    data: ObjectCompanyType[];
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



