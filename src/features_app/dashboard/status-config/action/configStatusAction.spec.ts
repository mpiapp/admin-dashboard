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

  await onGetConfigStatus()
  state = await store.getState().statusConfig;
  expect(state.data).toHaveLength(0);
});


test('create ConfigStatus test', async () => {
    let data = {
        name : "test"
    }
    await onCreateConfigStatus(data);
});

test('update ConfigStatus test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    await onUpdateConfigStatus(data);
});

test('remove ConfigStatus test', async () => {
    let data = {
        id : "1"
    }
    await onRemoveConfigStatus(data);
});
