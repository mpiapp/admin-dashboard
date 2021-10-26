import userSuperadminReducer from './userSuperadminSlice';
import { 
  fetchUserSuperadmin,
  postUserSuperadmin, 
  removeUserSuperadmin, 
  updateUserSuperadmin,
} from "./reducers/userSuperadminReducers";

import {
  ObjectUserSuperadmin,
  IStateUserSuperadmin
} from './userSuperadminTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => { 
    it('should handle initial state', () => {
      expect(userSuperadminReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectUserSuperadmin[],
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
  const initialState : IStateUserSuperadmin = {
    data: [] as ObjectUserSuperadmin[],
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
    const action = {type: fetchUserSuperadmin.pending};
    const stateReducer = userSuperadminReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectUserSuperadmin[],
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
      "id": "jhadfad",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
    }
  
    const res = await store.dispatch(fetchUserSuperadmin())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectUserSuperadmin[],
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
    const nextState: IStateUserSuperadmin = await userSuperadminReducer(
      state,
      fetchUserSuperadmin.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "id": "asdfag1",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
    }
    const data = {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "password" : "asdf121412412312$#",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
  }
  
    const res = await store.dispatch(postUserSuperadmin(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectUserSuperadmin[],
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
    const nextState: IStateUserSuperadmin = await userSuperadminReducer(
      state,
      postUserSuperadmin.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "id": "2",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
    }
    const data = {
      "id": "12",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "password" : "asdf1adf31@12412312$#",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
  }
  
    const res = await store.dispatch(updateUserSuperadmin(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API update is rejected", async () => {
   
    const state = {
      data: [] as ObjectUserSuperadmin[],
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
    const nextState: IStateUserSuperadmin = await userSuperadminReducer(
      state,
      updateUserSuperadmin.rejected
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
      "id": "22",
      "name": "John Doe",
      "password": "asadfa@3asddfads",
      "email": "johndoe@gmail.com",
      "flag": "BUYER",
      "role": "superadmin",
      "status": "Active",
      "verified": false
  }
  
    const res = await store.dispatch(removeUserSuperadmin(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectUserSuperadmin[],
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
    const nextState: IStateUserSuperadmin = await userSuperadminReducer(
      state,
      removeUserSuperadmin.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
