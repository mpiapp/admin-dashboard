import buyerCategoryReducer from './buyerCategorySlice';
import { 
  fetchBuyerCategory,
  postBuyerCategory, 
  removeBuyerCategory, 
  updateBuyerCategory,
} from "./reducers/buyerCategoryReducers";

import {
  ObjectBuyerCategory,
  IStateBuyerCategory
} from './buyerCategoryTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(buyerCategoryReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectBuyerCategory[],
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
  const initialState : IStateBuyerCategory = {
    data: [] as ObjectBuyerCategory[],
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
    const action = {type: fetchBuyerCategory.pending};
    const stateReducer = buyerCategoryReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectBuyerCategory[],
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
      "name": "Hotel Buyer",
      "id": "asdfadf1"
    }
  
    const res = await store.dispatch(fetchBuyerCategory())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectBuyerCategory[],
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
    const nextState: IStateBuyerCategory = await buyerCategoryReducer(
      state,
      fetchBuyerCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "Restaurant Buyer",
      "id": "asdfadf1"
    }
    const data = {
      "name": "New"
  }
  
    const res = await store.dispatch(postBuyerCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectBuyerCategory[],
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
    const nextState: IStateBuyerCategory = await buyerCategoryReducer(
      state,
      postBuyerCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name": "FnB Buyer",
      "id": "1"
    }
    const data = {
      "name" : "Update",
      "id": "1"
  }
  
    const res = await store.dispatch(updateBuyerCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectBuyerCategory[],
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
    const nextState: IStateBuyerCategory = await buyerCategoryReducer(
      state,
      updateBuyerCategory.rejected
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
  
    const res = await store.dispatch(removeBuyerCategory(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectBuyerCategory[],
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
    const nextState: IStateBuyerCategory = await buyerCategoryReducer(
      state,
      removeBuyerCategory.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
