import { store } from "../../../../app/store";
import { 
    onGetLegalDocument, 
    onCreateLegalDocument, 
    onRemoveLegalDocument,
    onUpdateLegalDocument 
} from './legalDocumentAction'

test('getLegalDocument test', async () => {
  let state = store.getState().statusConfig;
  expect(state.data).toHaveLength(0);

    onGetLegalDocument()
  state = await store.getState().statusConfig;
  expect(state.data).toHaveLength(0);
});


test('create LegalDocument test', async () => {
    let data = {
        title : "test",
        short_title: "test"
    }
    onCreateLegalDocument(data);
});

test('update LegalDocument test', async () => {
    let data = {
        title : "test",
        short_title: "test",
        id: "2"
    }
    onUpdateLegalDocument(data);
});

test('remove LegalDocument test', async () => {
    let data = {
        id : "12"
    }
    onRemoveLegalDocument(data);
});
