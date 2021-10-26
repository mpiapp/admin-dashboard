import { store } from "../../../../app/store";
import { 
    fetchCompanyType,  
    postCompanyType,
    updateCompanyType,
    removeCompanyType 
} from '../reducers/companyTypeReducers'

export const onGetCompanyType = (): void => {
    store.dispatch(fetchCompanyType());
  };
  
export const onCreateCompanyType = (data: any): void => {
    store.dispatch(postCompanyType(data));
};

export const onUpdateCompanyType = (data: any): void => {
    store.dispatch(updateCompanyType(data));
};
 
export const onRemoveCompanyType = (data: any): void => {
    store.dispatch(removeCompanyType(data));
};
