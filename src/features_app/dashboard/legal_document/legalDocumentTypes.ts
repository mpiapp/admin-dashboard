/* istanbul ignore file */

export interface DataRowLegalDocument {
    title: string;
    id: string;
    short_title: string,
    selector? : any
}

export interface LegalDocumentInput { 
    id? : string;
    title: string;
    short_title: string,
}

export interface ObjectLegalDocument {
    title: string;
    id: string;
    short_title: string,
}

export interface IStateLegalDocument {
    data: ObjectLegalDocument[];
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



