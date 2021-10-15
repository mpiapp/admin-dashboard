import { store } from "../../../../app/store";
import {
    fetchModules,
    postModules,
    updateModules,
    removeModules
 } from '../reducers/modulesReducers'

export const onGetModules = (): void => {
    store.dispatch(fetchModules());
  };
  
export const onCreateModules = (data: any): void => {
    store.dispatch(postModules(data));
};

export const onUpdateModules = (data: any): void => {
    store.dispatch(updateModules(data));
};
 
export const onRemoveModules = (data: any): void => {
    store.dispatch(removeModules(data));
};
