import { store } from "../../../../app/store";
import { 
    onGetConfigStatus, 
    onCreateConfigStatus, 
    onRemoveConfigStatus,
    onUpdateConfigStatus 
} from './configStatusAction'

test('getConfigStatus test', async () => {
  let state = store.getState().statusConfig;
  expect(state.data).toHaveLength(0);

    onGetConfigStatus()
  state = await store.getState().statusConfig;
  expect(state.data).toHaveLength(0);
});


test('create ConfigStatus test', async () => {
    let data = {
        name : "test"
    }
    onCreateConfigStatus(data);
});

test('update ConfigStatus test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateConfigStatus(data);
});

test('remove ConfigStatus test', async () => {
    let data = {
        id : "1"
    }
    onRemoveConfigStatus(data);
});
