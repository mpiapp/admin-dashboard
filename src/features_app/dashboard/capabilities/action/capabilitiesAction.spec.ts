import { store } from "../../../../app/store";
import { onGetCapability, onCreateCapability, onRemoveCapability, onUpdateCapability } from './capabilitiesAction'

test('getCapability test', async () => {
  let state = store.getState().capabilities;
  expect(state.data).toHaveLength(0);

  onGetCapability()
  state = await store.getState().capabilities;
  expect(state.data).toHaveLength(0);
});


test('create capability test', async () => {
    let data = {
        name : "test"
    }
    onCreateCapability(data);
});

test('update capability test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateCapability(data);
});

test('remove capability test', async () => {
    let data = {
        id : "1"
    }
    onRemoveCapability(data);
});
