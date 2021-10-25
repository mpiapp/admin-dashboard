import companyTypeReducer from './companyTypesSlice';
import { 
  fetchCompanyType,
  postCompanyType, 
  removeCompanyType, 
  updateCompanyType,
} from "./reducers/companyTypeReducers";

import { ObjectCompanyType, IStateCompanyType} from './companyTypeTypes'
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(companyTypeReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectCompanyType[],
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
  const initialState : IStateCompanyType = {
    data: [] as ObjectCompanyType[],
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
    const action = {type: fetchCompanyType.pending};
    const stateReducer = companyTypeReducer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectCompanyType[],
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
      "name": "PT",
      "legal_doc": [
        "asdfadf"
      ],
      "id": "0s9s06R"
    }
  
    const res = await store.dispatch(fetchCompanyType())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectCompanyType[],
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
    const nextState: IStateCompanyType = await companyTypeReducer(
      state,
      fetchCompanyType.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "name": "CV",
      "legal_doc": [
        "asdfadf"
      ],
      "id": "0s9s06R"
    }
    const data = {
      "name": "CV",
      "legal_doc": [
        "asdfadf"
      ]
    }
  
    const res = await store.dispatch(postCompanyType(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectCompanyType[],
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
    const nextState: IStateCompanyType = await companyTypeReducer(
      state,
      postCompanyType.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
  
    expect(rootState.capabilities.loading_create).toBe(false)
    expect(rootState.capabilities.error_create).toEqual(undefined)


  });


  it("should update state when update feature is successful", async () => {
    // Arrange
    const response = {
      "name": "UMKM",
      "legal_doc": [
        "asdfadf"
      ],
      "id": "0s9s06R"
    }
    const data = {
      "name": "UMKMM",
      "legal_doc": [
        "asdfadf"
      ],
      "id": "2"
  }
  
    const res = await store.dispatch(updateCompanyType(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API update is rejected", async () => {
   
    const state = {
      data: [] as ObjectCompanyType[],
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
    const nextState: IStateCompanyType = await companyTypeReducer(
      state,
      updateCompanyType.rejected
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
      "id": "12"
  }
  
    const res = await store.dispatch(removeCompanyType(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectCompanyType[],
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
    const nextState: IStateCompanyType = await companyTypeReducer(
      state,
      removeCompanyType.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, capabilities: nextState };
   
    expect(rootState.capabilities.loading_remove).toBe(false)
    expect(rootState.capabilities.error_remove).toEqual(undefined)


  });
})
