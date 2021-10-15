import { store } from "../../../../app/store";
// import { fetchCapability, postCapability, removeCapability, updateCapability } from "../reducers/reducersCapability";
import { onGetCapability, onCreateCapability, onRemoveCapability, onUpdateCapability } from './dispatchAction'

test('getCapability test', async () => {
  let state = store.getState().capabilities;
  expect(state.data).toHaveLength(0);

  await onGetCapability()
  state = await store.getState().capabilities;
  expect(state.data).toHaveLength(0);
});


test('create capability test', async () => {
    let data = {
        name : "test"
    }
    await onCreateCapability(data);
});

test('update capability test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    await onUpdateCapability(data);
});

test('remove capability test', async () => {
    let data = {
        id : "1"
    }
    await onRemoveCapability(data);
});
