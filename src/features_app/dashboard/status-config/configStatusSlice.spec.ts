
import configStatusReduer from './configStatusSlice';
import { 
  fetchConfigStatus,
  postConfigStatus, 
  removeConfigStatus, 
  updateConfigStatus,
} from './reducers/configStatusReducers'

import {
  ObjectConfigStatus,
  IStateConfigStatus,
} from './configStatusTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE CONFIG STATUS SLICE', () => {
    it('should handle initial state', () => {
      expect(configStatusReduer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectConfigStatus[],
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
  const initialState : IStateConfigStatus = {
    data: [] as ObjectConfigStatus[],
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
    const action = {type: fetchConfigStatus.pending};
    const stateReducer = configStatusReduer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectConfigStatus[],
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
      "name": "Open to Submit",
      "current": "Open",
      "next": [
        {
          "id": "_byDibm",
          "name": "Submit"
        }
      ],
      "id": "D-6CDDf"
    }
  
    const res = await store.dispatch(fetchConfigStatus())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectConfigStatus[],
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
    const nextState: IStateConfigStatus = await configStatusReduer(
      state,
      fetchConfigStatus.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "Open to Status",
      "current": "Open",
      "next": [
          {
              "id": "_byDibm",
              "name": "Submit"
          }
      ],
      "id": "sIkSRjK"
    }

    const data = {
      "name": "Open to Status",
      "current": "Open",
      "next": [
          {
              "id": "_byDibm",
              "name": "Submit"
          }
      ],
      "id": "1"
    }
    
  
    const res = await store.dispatch(postConfigStatus(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectConfigStatus[],
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
    const nextState: IStateConfigStatus = await configStatusReduer(
      state,
      postConfigStatus.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });



  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "name": "Open to Status",
      "current": "Open",
      "next": [
          {
              "id": "_byDibm",
              "name": "Submit"
          }
      ],
      "id": "sIkSRjKa"
    }

    const data = {
      "name": "Open to Status",
      "current": "Open",
      "next": [
          {
              "id": "_byDibm",
              "name": "Submit"
          }
      ],
      "id": "1"

    }
  
    const res = await store.dispatch(updateConfigStatus(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectConfigStatus[],
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
    const nextState: IStateConfigStatus = await configStatusReduer(
      state,
      updateConfigStatus.rejected
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
      "name": "Open to Status",
      "current": "Open",
      "next": [
          {
              "id": "_byDibm",
              "name": "Submit"
          }
      ],
      "id": "1"
  }
  
    const res = await store.dispatch(removeConfigStatus(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectConfigStatus[],
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
    const nextState: IStateConfigStatus = await configStatusReduer(
      state,
      removeConfigStatus.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
