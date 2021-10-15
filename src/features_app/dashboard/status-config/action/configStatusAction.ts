import { store } from "../../../../app/store";
import { 
    fetchConfigStatus, 
    postConfigStatus, 
    removeConfigStatus, 
    updateConfigStatus
 } from "../reducers/configStatusReducers";

export const onGetConfigStatus = (): void => {
    store.dispatch(fetchConfigStatus());
  };
  
export const onCreateConfigStatus = (data: any): void => {
    store.dispatch(postConfigStatus(data));
};

export const onUpdateConfigStatus = (data: any): void => {
    store.dispatch(updateConfigStatus(data));
};
 
export const onRemoveConfigStatus = (data: any): void => {
    store.dispatch(removeConfigStatus(data));
};
