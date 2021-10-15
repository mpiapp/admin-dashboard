import rolesReducer from './rolesSlice';
import rolesSlice from './rolesSlice';
import { 
  fetchRoles,
  postRoles, 
  removeRoles, 
  updateRoles,
} from "./reducers/rolesReducers";

import {
  RolesInput,
  IStateRoles,
  ObjectInput
} from './rolesTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(rolesReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as RolesInput[],
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
  const initialState : IStateRoles = {
    data: [] as ObjectInput[],
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
    const action = {type: fetchRoles.pending};
    const stateReducer = rolesReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectInput[],
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
      "id": "asdfah123sda",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]
    }
  
    const res = await store.dispatch(fetchRoles())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectInput[],
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
    const nextState: IStateRoles = await rolesSlice(
      state,
      fetchRoles.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "id": "asdfah123sda",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]
    }

    const data = {
      "id": "1",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]
    }
    
  
    const res = await store.dispatch(postRoles(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectInput[],
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
    const nextState: IStateRoles = await rolesSlice(
      state,
      postRoles.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });



  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "id": "asdfah123sda",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]
    }

    const data = {
      "id": "1",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]

    }
  
    const res = await store.dispatch(updateRoles(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectInput[],
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
    const nextState: IStateRoles = await rolesSlice(
      state,
      updateRoles.rejected
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
      "id": "1",
      "name": "Admin",
      "flag": "VENDOR",
      "module_ids": [
        "mid1",
        "mid2"
      ]
  }
  
    const res = await store.dispatch(removeRoles(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectInput[],
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
    const nextState: IStateRoles = await rolesSlice(
      state,
      removeRoles.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})



