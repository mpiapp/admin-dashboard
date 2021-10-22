import { store } from "../../../../app/store";
import { 
    fetchLegalDocument, 
    postLegalDocument, 
    removeLegalDocument, 
    updateLegalDocument
 } from "../reducers/legalDocumentReducers";

export const onGetLegalDocument = (): void => {
    store.dispatch(fetchLegalDocument());
  };
  
export const onCreateLegalDocument = (data: any): void => {
    store.dispatch(postLegalDocument(data));
};

export const onUpdateLegalDocument = (data: any): void => {
    store.dispatch(updateLegalDocument(data));
};
 
export const onRemoveLegalDocument = (data: any): void => {
    store.dispatch(removeLegalDocument(data));
};
