import { store } from "../../../../app/store";
import { fetchPaymentTerms, postPaymentTerms, removePaymentTerms, updatePaymentTerms } from "../reducers/paymentTermsReducers";

export const onGetPaymentTerms = (): void => {
    store.dispatch(fetchPaymentTerms());
  };
  
export const onCreatePaymentTerms = (data: any): void => {
    store.dispatch(postPaymentTerms(data));
};

export const onUpdatePaymentTerms = (data: any): void => {
    store.dispatch(updatePaymentTerms(data));
};
 
export const onRemovePaymentTerms = (data: any): void => {
    store.dispatch(removePaymentTerms(data));
};
