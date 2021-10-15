import { store } from "../../../../app/store";
import { fetchCapability, postCapability, removeCapability, updateCapability } from "../reducers/reducersCapability";

export const onGetCapability = (): void => {
    store.dispatch(fetchCapability());
  };
  
export const onCreateCapability = (data: any): void => {
    store.dispatch(postCapability(data));
};

export const onUpdateCapability = (data: any): void => {
    store.dispatch(updateCapability(data));
};
 
export const onRemoveCapability = (data: any): void => {
    store.dispatch(removeCapability(data));
};
