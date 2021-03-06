import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features_app/auth/login/loginSlice';
import forgotReducer from '../features_app/auth/forgot/forgotSlice';
import modulesReducer from '../features_app/dashboard/modules/modulesSlice';
import rolesReducer from '../features_app/dashboard/roles/rolesSlice';
import capabilitiesReducer from '../features_app/dashboard/capabilities/capabilitiesSlice';
import featuresReducer from '../features_app/dashboard/features/featuresSlice';
import flagReducer from '../features_app/dashboard/flag/flagSlice';
import statusReducer from '../features_app/dashboard/status/statusSlice';
import configStatusReducer from '../features_app/dashboard/status_config/configStatusSlice';
import paymentTermsReducer from '../features_app/dashboard/payment_terms/paymentTermsSlice';
import legalDocumentReducer from '../features_app/dashboard/legal_document/legalDoccumentSlice';
import companyTypeReducer from '../features_app/dashboard/company_type/companyTypesSlice';
import userSuperadminReducer from '../features_app/dashboard/user_superadmin/userSuperadminSlice';
import vendorCategoryReducer from '../features_app/dashboard/vendor_category/vendorCategorySlice';
import buyerCategoryReducer from '../features_app/dashboard/buyer_category/buyerCategorySlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgot: forgotReducer,
    flag: flagReducer,
    modules: modulesReducer,
    roles: rolesReducer,
    capabilities: capabilitiesReducer,
    features: featuresReducer,
    status: statusReducer,
    statusConfig: configStatusReducer,
    paymentterms: paymentTermsReducer,
    legaldocument: legalDocumentReducer,
    companytype: companyTypeReducer,  
    usersuperadmin: userSuperadminReducer,  
    vendorcategory: vendorCategoryReducer,  
    buyercategory: buyerCategoryReducer,  
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
