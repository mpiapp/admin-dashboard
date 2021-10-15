/* istanbul ignore file */

export interface ObjectFlag {
    value: string;
    label: string;
}

export interface IStateFlag {
    data: ObjectFlag[];
    loading: boolean;
    error? : any,
}