import { store } from "../../../../app/store";
import { fetchStatus, postStatus, removeStatus, updateStatus } from "../reducers/statusReducers";

export const onGetStatus = (): void => {
    store.dispatch(fetchStatus());
  };
  
export const onCreateStatus = (data: any): void => {
    store.dispatch(postStatus(data));
};

export const onUpdateStatus = (data: any): void => {
    store.dispatch(updateStatus(data));
};
 
export const onRemoveStatus = (data: any): void => {
    store.dispatch(removeStatus(data));
};
