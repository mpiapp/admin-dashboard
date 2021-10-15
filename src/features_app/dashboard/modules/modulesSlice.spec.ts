import modulesReducer from './modulesSlice';
import { 
  fetchModules,
  postModules, 
  removeModules, 
  updateModules,
} from "./reducers/modulesReducers";
import modulesSlice from './modulesSlice';

import { ObjectModules, IStateModules } from './modulesType'
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE NAVIGATION SLICE', () => {
    it('should handle initial state', () => {
      expect(modulesReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectModules[],
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
  const initialState : IStateModules = {
    data: [] as ObjectModules[],
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
    const action = {type: fetchModules.pending};
    const stateReducer = modulesReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectModules[],
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
      "feature_ids": ["1", "2"], 
      "flag": "VENDOR", 
      "id": "asdfadfa13asdsfa", 
      "link": "/manage-pr", 
      "name": "Manage PR"
    }
  
    const res = await store.dispatch(fetchModules())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectModules[],
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
    const nextState: IStateModules = await modulesSlice(
      state,
      fetchModules.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name" : "Manage PR",
      "link" : "/manage-pr",
      "flag" : "BUYER",
      "feature_ids" : ["id1", "id2"] 
    }

    const data = {
        "name" : "Manage PR",
        "link" : "/manage-pr",
        "flag" : "BUYER",
        "feature_ids" : ["id1", "id2"] 
      }
    
  
    const res = await store.dispatch(postModules(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectModules[],
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
    const nextState: IStateModules = await modulesSlice(
      state,
      postModules.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });



  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "feature_ids": ["id1", "id2"], 
      "flag": "VENDOR", 
      "id": "asdfadfa13asdsfa", 
      "link": "/manage-pr", 
      "name": "Manage PR"
    }

    const data = {
      "name" : "Manage PR",
      "link" : "/manage-pr",
      "flag" : "VENDOR",
      "feature_ids" : ["id1", "id2"],
      "id": "1", 

    }
  
    const res = await store.dispatch(updateModules(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectModules[],
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
    const nextState: IStateModules = await modulesSlice(
      state,
      updateModules.rejected
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
      "name" : "Manage PR",
      "link" : "/manage-pr",
      "flag" : "VENDOR",
      "feature_ids" : ["id1", "id2"],
      "id": "1", 
  }
  
    const res = await store.dispatch(removeModules(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectModules[],
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
    const nextState: IStateModules = await modulesSlice(
      state,
      removeModules.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
