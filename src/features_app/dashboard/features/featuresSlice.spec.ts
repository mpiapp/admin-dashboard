import featuresReducer from './featuresSlice';
import { 
  fetchFeatures,
  postFeatures, 
  removeFeatures, 
  updateFeatures,
} from "./reducers/featuresReducers";
import featuresSlice from './featuresSlice';

import { ObjectFeatures, IStateFeatures} from './featuresTypes'
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(featuresReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectFeatures[],
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
  const initialState : IStateFeatures = {
    data: [] as ObjectFeatures[],
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
    const action = {type: fetchFeatures.pending};
    const stateReducer = featuresReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectFeatures[],
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
      "name": "asdfadfa",
      "flag": "VENDOR",
      "capabilities": [
        "YiliWMj"
      ],
      "id": "QCVJk0a"
    }
  
    const res = await store.dispatch(fetchFeatures())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectFeatures[],
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
    const nextState: IStateFeatures = await featuresSlice(
      state,
      fetchFeatures.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "Purchase Order",
      "flag": "BUYER",
      "capability_ids": [
          "id1",
          "id2"
      ],
      "id": "Yxdgpia"
    }
    const data = {
      "name": "delete"
    }
  
    const res = await store.dispatch(postFeatures(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectFeatures[],
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
    const nextState: IStateFeatures = await featuresSlice(
      state,
      postFeatures.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when post feature is successful", async () => {
    // Arrange
    const response = {
      "name": "Purchase Order",
      "flag": "BUYER",
      "capability_ids": [
          "id1",
          "id2"
      ],
      "id": "Yxdgpia"
    }
    const data = {
      "name" : "test",
      "id": "1"
  }
  
    const res = await store.dispatch(updateFeatures(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });


  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name": "Purchase Order",
      "flag": "BUYER",
      "capability_ids": [
          "id1",
          "id2"
      ],
      "id": "Yxdgpia"
    }
    const data = {
      "name" : "test",
      "id": "1"
  }
  
    const res = await store.dispatch(updateFeatures(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectFeatures[],
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
    const nextState: IStateFeatures = await featuresSlice(
      state,
      updateFeatures.rejected
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
      "name" : "test",
      "id": "1"
  }
  
    const res = await store.dispatch(removeFeatures(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectFeatures[],
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
    const nextState: IStateFeatures = await featuresSlice(
      state,
      removeFeatures.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
