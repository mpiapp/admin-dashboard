
import legalDocumentReduer from './legalDoccumentSlice';
import { 
  fetchLegalDocument,
  postLegalDocument, 
  removeLegalDocument, 
  updateLegalDocument,
} from './reducers/legalDocumentReducers'

import {
  ObjectLegalDocument,
  IStateLegalDocument,
} from './legalDocumentTypes';
import { store, RootState } from '../../../app/store'

const appState = store.getState();

describe('INITIAL STATE STORE LEGAL DOCUMENT SLICE', () => {
    it('should handle initial state', () => {
      expect(legalDocumentReduer(undefined, { type: 'unknown' })).toEqual({
        data: [] as ObjectLegalDocument[],
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
  const initialState : IStateLegalDocument = {
    data: [] as ObjectLegalDocument[],
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
    const action = {type: fetchLegalDocument.pending};
    const stateReducer = legalDocumentReduer(initialState, action);
    expect(stateReducer).toEqual(
      {
        data: [] as ObjectLegalDocument[],
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
      "title": "Nomor Pokok Wajib Pajak",
      "short_title" : "npwp",
      "id": "asdfadf"
    }
  
    const res = await store.dispatch(fetchLegalDocument())
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API call is rejected", async () => {
   
    const state = {
      data: [] as ObjectLegalDocument[],
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
    const nextState: IStateLegalDocument = await legalDocumentReduer(
      state,
      fetchLegalDocument.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, legaldocument: nextState };
   
    expect(rootState.legaldocument.error).toEqual(undefined)


  });


  it("should update state when post is successful", async () => {
    // Arrange
    const response = {
      "title": "Nomor Pokok Wajib",
      "short_title" : "npwp",
      "id": "legal3"
    }

    const data = {
      "title": "Nomor Pokok Wajib",
      "short_title" : "npwp",
      "id": "1"
    }
    
  
    const res = await store.dispatch(postLegalDocument(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
    const state = {
      data: [] as ObjectLegalDocument[],
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
    const nextState: IStateLegalDocument = await legalDocumentReduer(
      state,
      postLegalDocument.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, legaldocument: nextState };
  
    expect(rootState.legaldocument.loading_create).toBe(false)
    expect(rootState.legaldocument.error_create).toEqual(undefined)


  });



  it("should update state when update is successful", async () => {
    // Arrange
    const response = {
      "title": "Nomor Pokok Pajak",
      "short_title" : "npwp",
      "id": "legal2"
    }

    const data = {
      "title": "Nomor Pokok Pajak",
      "short_title" : "npwp",
      "id": "2"

    }
  
    const res = await store.dispatch(updateLegalDocument(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API post is rejected", async () => {
   
    const state = {
      data: [] as ObjectLegalDocument[],
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
    const nextState: IStateLegalDocument = await legalDocumentReduer(
      state,
      updateLegalDocument.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, legaldocument: nextState };
   
    expect(rootState.legaldocument.loading_update).toBe(false)
    expect(rootState.legaldocument.error_update).toEqual(undefined)


  });

  it("should update state when remove is successful", async () => {
    // Arrange
    const response = {
      "id": "2"
    }
    const data = {
      "title": "Nomor Pokok Pajak",
      "short_title" : "npwp",
      "id": "12"
  }
  
    const res = await store.dispatch(removeLegalDocument(data))
    expect(res.payload).toEqual(
      expect.objectContaining(response)
    );

  });

  it("should update state when API remove is rejected", async () => {
   
    const state = {
      data: [] as ObjectLegalDocument[],
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
    const nextState: IStateLegalDocument = await legalDocumentReduer(
      state,
      removeLegalDocument.rejected
    );
    // Assert
    const rootState: RootState = { ...appState, legaldocument: nextState };
   
    expect(rootState.legaldocument.loading_remove).toBe(false)
    expect(rootState.legaldocument.error_remove).toEqual(undefined)


  });
})
