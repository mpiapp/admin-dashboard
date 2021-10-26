import { store } from "../../../../app/store";
import { fetchUserSuperadmin, postUserSuperadmin, removeUserSuperadmin, updateUserSuperadmin } from "../reducers/userSuperadminReducers";

export const onGetUserSuperadmin = (): void => {
    store.dispatch(fetchUserSuperadmin());
  };
  
export const onCreateUserSuperadmin = (data: any): void => {
    store.dispatch(postUserSuperadmin(data));
};

export const onUpdateUserSuperadmin = (data: any): void => {
    store.dispatch(updateUserSuperadmin(data));
};
 
export const onRemoveUserSuperadmin = (data: any): void => {
    store.dispatch(removeUserSuperadmin(data));
};
