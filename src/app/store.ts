import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/auth/login/loginSlice';
import forgotReducer from '../features/auth/forgot/forgotSlice';
import registerReducer from '../features/auth/register/registerSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgot: forgotReducer,
    register: registerReducer,
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
