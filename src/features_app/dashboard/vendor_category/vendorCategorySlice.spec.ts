import vendorCategoryReducer from './vendorCategorySlice';
import { 
  fetchVendorCategory,
  postVendorCategory, 
  removeVendorCategory, 
  updateVendorCategory,
} from "./reducers/vendorCategoryReducers";

import {
  ObjectVendorCategory,
  IStateVendorCategory
} from './vendorCategoryTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(vendorCategoryReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectVendorCategory[],
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
  const initialState : IStateVendorCategory = {
    data: [] as ObjectVendorCategory[],
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
    const action = {type: fetchVendorCategory.pending};
    const stateReducer = vendorCategoryReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectVendorCategory[],
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
      "name": "Hotel",
      "id": "asdfadf1"
    }
  
    const res = await store.dispatch(fetchVendorCategory())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectVendorCategory[],
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
    const nextState: IStateVendorCategory = await vendorCategoryReducer(
      state,
      fetchVendorCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "Restaurant",
      "id": "asdfadf1"
    }
    const data = {
      "name": "New"
  }
  
    const res = await store.dispatch(postVendorCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectVendorCategory[],
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
    const nextState: IStateVendorCategory = await vendorCategoryReducer(
      state,
      postVendorCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name": "FnB",
      "id": "1"
    }
    const data = {
      "name" : "Update",
      "id": "1"
  }
  
    const res = await store.dispatch(updateVendorCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectVendorCategory[],
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
    const nextState: IStateVendorCategory = await vendorCategoryReducer(
      state,
      updateVendorCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_update).toBe(false)
    expect(rootState.capabilities.error_update).toEqual(undefined)


  });

  it("should update state when remove is successful", async () => {
    // Arrange
    const response = {
      "id": "2"
    }
    const data = {
      "name" : "remove",
      "id": "2"
  }
  
    const res = await store.dispatch(removeVendorCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectVendorCategory[],
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
    const nextState: IStateVendorCategory = await vendorCategoryReducer(
      state,
      removeVendorCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
