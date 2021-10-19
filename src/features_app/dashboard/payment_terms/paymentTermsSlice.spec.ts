
import paymentTermsReducer from './paymentTermsSlice';
import { 
  fetchPaymentTerms,
  postPaymentTerms, 
  removePaymentTerms, 
  updatePaymentTerms,
} from "./reducers/paymentTermsReducers";

import {
  ObjectPaymentTerms,
  IStatePaymentTerms,
} from './paymentTermsTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE STATUS SLICE', () => {
    it('should handle initial state', () => {
      expect(paymentTermsReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectPaymentTerms[],
        loading : false,
        error : null,
        loading_create : false,
        error_create: null,
        create : false,
        loading_update : false,
        error_update: null,
        update : false,
        loading_remove : false,
        error_remove: null,
        remove : false
      });
    });
})



describe('TEST REDUX SLICE', () => {
  const initialState : IStatePaymentTerms = {
    data: [] as ObjectPaymentTerms[],
    loading : false,
    error : null,
    loading_create : false,
    error_create: null,
    create : false,
    loading_update : false,
    error_update: null,
    update : false,
    loading_remove : false,
    error_remove: null,
    remove : false
  }
  it("should update state when API call is pending", async () => {
    const action = {type: fetchPaymentTerms.pending};
    const stateReducer = paymentTermsReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectPaymentTerms[],
        loading : true,
        error : null,
        loading_create : false,
        error_create: null,
        create : false,
        loading_update : false,
        error_update: null,
        update : false,
        loading_remove : false,
        error_remove: null,
        remove : false
      }
    )

  });

  it("should update state when API call is successful", async () => {
    // Arrange
    const response = {
      "name": "COD",
      "id": "ab1"
    }
  
    const res = await store.dispatch(fetchPaymentTerms())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectPaymentTerms[],
      loading : true,
      error : null,
      loading_create : false,
      error_create: null,
      create : false,
      loading_update : false,
      error_update: null,
      update : false,
      loading_remove : false,
      error_remove: null,
      remove : false
    }
    const nextState: IStatePaymentTerms = await paymentTermsReducer(
      state,
      fetchPaymentTerms.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "COD",
      "id": "ab12"
    }

    const data = {
      "name" : "COD",
      "id" : "1"
    }
    
  
    const res = await store.dispatch(postPaymentTerms(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectPaymentTerms[],
      loading : true,
      error : null,
      loading_create : false,
      error_create: null,
      create : false,
      loading_update : false,
      error_update: null,
      update : false,
      loading_remove : false,
      error_remove: null,
      remove : false
    }
    const nextState: IStatePaymentTerms = await paymentTermsReducer(
      state,
      postPaymentTerms.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });



  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name": "COD",
      "id": "ab123"
    }

    const data = {
      "name": "Status",
      "id": "1"

    }
  
    const res = await store.dispatch(updatePaymentTerms(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectPaymentTerms[],
      loading : true,
      error : null,
      loading_create : false,
      error_create: null,
      create : false,
      loading_update : false,
      error_update: null,
      update : false,
      loading_remove : false,
      error_remove: null,
      remove : false
    }
    const nextState: IStatePaymentTerms = await paymentTermsReducer(
      state,
      updatePaymentTerms.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_update).toBe(false)
    expect(rootState.capabilities.error_update).toEqual(undefined)


  });

  it("should update state when remove is successful", async () => {
    // Arrange
    const response = {}
    const data = {
      "name" : "aba",
      "id": "1"
    }
  
    const res = await store.dispatch(removePaymentTerms(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectPaymentTerms[],
      loading : true,
      error : null,
      loading_create : false,
      error_create: null,
      create : false,
      loading_update : false,
      error_update: null,
      update : false,
      loading_remove : false,
      error_remove: null,
      remove : false
    }
    const nextState: IStatePaymentTerms = await paymentTermsReducer(
      state,
      removePaymentTerms.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})


