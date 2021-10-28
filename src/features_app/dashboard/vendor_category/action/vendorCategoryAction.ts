import { store } from "../../../../app/store";
import { fetchVendorCategory, postVendorCategory, removeVendorCategory, updateVendorCategory } from "../reducers/vendorCategoryReducers";

export const onGetVendorCategory = (): void => {
    store.dispatch(fetchVendorCategory());
  };
  
export const onCreateVendorCategory = (data: any): void => {
    store.dispatch(postVendorCategory(data));
};

export const onUpdateVendorCategory = (data: any): void => {
    store.dispatch(updateVendorCategory(data));
};
 
export const onRemoveVendorCategory = (data: any): void => {
    store.dispatch(removeVendorCategory(data));
};
