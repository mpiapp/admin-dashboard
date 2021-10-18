/* istanbul ignore file */

export interface DataRow {
    name: string;
    id: string;
    flag: string;
    capabilities?: any;
    selector? : any
}

export interface FeaturesInput { 
    name: string;
    id? : string;
    flag?: string;
    capabilities?: any;
}

export interface ObjectFeatures {
    name: string;
    id: string;
    flag: string;
    capabilities?: any;
}

export interface IStateFeatures {
    data: ObjectFeatures[];
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



