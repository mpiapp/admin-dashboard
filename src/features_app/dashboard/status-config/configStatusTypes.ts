/* istanbul ignore file */

export interface DataRow {
    name: string;
    id: string;
    current: string,
    next: any[];
    selector? : any
}; 

export interface ConfigStatusInput { 
    id? : string;
    name: string;
    current?: string,
    next?: any[];
}

export interface ObjectConfigStatus {
    name: string;
    id: string;
    next: any[];
    current: string,
}

export interface IStateConfigStatus {
    data: ObjectConfigStatus[];
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



