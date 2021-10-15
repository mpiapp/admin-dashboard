import { store } from "../../../../app/store";
import {
    fetchRoles,
    postRoles,
    updateRoles,
    removeRoles
 } from '../reducers/rolesReducers'

export const onGetRoles = (): void => {
    store.dispatch(fetchRoles());
  };
  
export const onCreateRoles = (data: any): void => {
    store.dispatch(postRoles(data));
};

export const onUpdateRoles = (data: any): void => {
    store.dispatch(updateRoles(data));
};
 
export const onRemoveRoles = (data: any): void => {
    store.dispatch(removeRoles(data));
};
