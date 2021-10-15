import capabilityReducer from './capabilitiesSlice';
import capabilitySlice from './capabilitiesSlice';
import { 
  fetchCapability,
  postCapability, 
  removeCapability, 
  updateCapability,
} from "./reducers/reducersCapability";

import {
  ObjectCapability,
  IStateCapability
} from './capabilitiesTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(capabilityReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectCapability[],
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
  const initialState : IStateCapability = {
    data: [] as ObjectCapability[],
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
    const action = {type: fetchCapability.pending};
    const stateReducer = capabilityReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectCapability[],
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
        "name": "delete",
        "id": "YiliWMj"
    }
  
    const res = await store.dispatch(fetchCapability())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectCapability[],
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
    const nextState: IStateCapability = await capabilitySlice(
      state,
      fetchCapability.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {"id": "LtUmlB0", "name": "apalah"}
    const data = {
      "name": "delete"
  }
  
    const res = await store.dispatch(postCapability(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectCapability[],
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
    const nextState: IStateCapability = await capabilitySlice(
      state,
      postCapability.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name" : "test",
      "id": "YiliWMj"
    }
    const data = {
      "name" : "test",
      "id": "1"
  }
  
    const res = await store.dispatch(updateCapability(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectCapability[],
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
    const nextState: IStateCapability = await capabilitySlice(
      state,
      updateCapability.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_update).toBe(false)
    expect(rootState.capabilities.error_update).toEqual(undefined)


  });

  it("should update state when remove is successful", async () => {
    // Arrange
    const response = {
      "name" : "test",
      "id": "YiliWMj"
    }
    const data = {
      "name" : "test",
      "id": "1"
  }
  
    const res = await store.dispatch(removeCapability(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectCapability[],
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
    const nextState: IStateCapability = await capabilitySlice(
      state,
      removeCapability.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
