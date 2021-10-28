import { store } from "../../../../app/store";
import { fetchBuyerCategory, postBuyerCategory, removeBuyerCategory, updateBuyerCategory } from "../reducers/buyerCategoryReducers";

export const onGetBuyerCategory = (): void => {
    store.dispatch(fetchBuyerCategory());
  };
  
export const onCreateBuyerCategory = (data: any): void => {
    store.dispatch(postBuyerCategory(data));
};

export const onUpdateBuyerCategory = (data: any): void => {
    store.dispatch(updateBuyerCategory(data));
};
 
export const onRemoveBuyerCategory = (data: any): void => {
    store.dispatch(removeBuyerCategory(data));
};
